from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from ..db import get_session
from . import service
from .schemas import UserCreate, UserRead


router = APIRouter()


@router.post("/register", response_model=UserRead)
async def register(data: UserCreate, session: AsyncSession = Depends(get_session)) -> UserRead:
    user = await service.create_user_with_channel(session, data)
    await session.commit()
    return UserRead.model_validate(user)

