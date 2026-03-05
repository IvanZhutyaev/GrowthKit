from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from ..db import get_session
from .schemas import ChannelDashboard
from .service import get_channel_dashboard


router = APIRouter()


@router.get("/dashboard/{channel_id}", response_model=ChannelDashboard)
async def read_channel_dashboard(channel_id: int, session: AsyncSession = Depends(get_session)) -> ChannelDashboard:
    return await get_channel_dashboard(session, channel_id)

