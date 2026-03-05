from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from ..db import get_session
from .schemas import GeneratePostRequest, GeneratedPostRead
from .service import generate_post


router = APIRouter()


@router.post("/generate", response_model=GeneratedPostRead)
async def generate(data: GeneratePostRequest, session: AsyncSession = Depends(get_session)) -> GeneratedPostRead:
    try:
        post = await generate_post(session, data)
        await session.commit()
    except ValueError as exc:
        await session.rollback()
        raise HTTPException(status_code=429, detail=str(exc))
    return GeneratedPostRead.model_validate(post)

