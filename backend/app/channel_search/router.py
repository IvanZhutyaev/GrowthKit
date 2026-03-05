from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from ..db import get_session
from .schemas import ChannelSearchFilters, ChannelSearchResult
from .service import search_channels


router = APIRouter()


@router.post("/search", response_model=list[ChannelSearchResult])
async def search(filters: ChannelSearchFilters, session: AsyncSession = Depends(get_session)) -> list[ChannelSearchResult]:
    results = await search_channels(session, filters)
    return [ChannelSearchResult.model_validate(item) for item in results]

