from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from .models import User, Channel
from .schemas import UserCreate


async def get_user_by_telegram_id(session: AsyncSession, telegram_id: int) -> User | None:
    result = await session.execute(select(User).where(User.telegram_id == telegram_id))
    return result.scalar_one_or_none()


async def create_user_with_channel(session: AsyncSession, data: UserCreate) -> User:
    user = await get_user_by_telegram_id(session, data.telegram_id)
    if user is None:
        user = User(
            telegram_id=data.telegram_id,
            username=data.username,
            first_name=data.first_name,
            last_name=data.last_name,
        )
        session.add(user)
        await session.flush()
    channel = Channel(
        telegram_id=data.channel.telegram_id,
        title=data.channel.title,
        username=data.channel.username,
        owner_id=user.id,
    )
    session.add(channel)
    await session.flush()
    await session.refresh(user)
    return user

