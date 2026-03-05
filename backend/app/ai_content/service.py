from datetime import datetime, timedelta

import httpx
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ..config import get_settings
from .models import GeneratedPost
from .schemas import GeneratePostRequest


MAX_GENERATIONS_PER_WEEK = 5


async def ensure_quota(session: AsyncSession, user_id: int) -> None:
    since = datetime.utcnow() - timedelta(days=7)
    stmt = (
        select(GeneratedPost)
        .where(GeneratedPost.user_id == user_id, GeneratedPost.created_at >= since)
    )
    result = await session.execute(stmt)
    count = len(result.scalars().all())
    if count >= MAX_GENERATIONS_PER_WEEK:
        raise ValueError("Generation limit exceeded")


async def generate_with_openai(prompt: str) -> str:
    settings = get_settings()
    if not settings.openai_api_key:
        raise RuntimeError("AI provider key is not configured")
    headers = {
        "Authorization": f"Bearer {settings.openai_api_key}",
        "Content-Type": "application/json",
    }
    payload = {
        "model": "gpt-4o-mini",
        "messages": [
            {"role": "system", "content": "You generate high quality Telegram posts in Russian."},
            {"role": "user", "content": prompt},
        ],
    }
    async with httpx.AsyncClient(timeout=30) as client:
        response = await client.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
        response.raise_for_status()
        data = response.json()
        return data["choices"][0]["message"]["content"]


async def generate_post(session: AsyncSession, data: GeneratePostRequest) -> GeneratedPost:
    await ensure_quota(session, data.user_id)

    parts = [f"Тема: {data.topic}"]
    if data.tone:
        parts.append(f"Тон: {data.tone}")
    if data.length:
        parts.append(f"Длина: {data.length}")
    prompt = "\n".join(parts)

    content = await generate_with_openai(prompt)

    post = GeneratedPost(
        user_id=data.user_id,
        channel_id=data.channel_id,
        prompt=prompt,
        content=content,
    )
    session.add(post)
    await session.flush()
    await session.refresh(post)
    return post

