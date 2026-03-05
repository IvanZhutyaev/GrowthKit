from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from .models import SearchableChannel
from .schemas import ChannelSearchFilters


async def search_channels(session: AsyncSession, filters: ChannelSearchFilters) -> list[SearchableChannel]:
    pattern = f"%{filters.query}%"

    stmt = select(SearchableChannel).where(
        (SearchableChannel.title.ilike(pattern)) | (SearchableChannel.username.ilike(pattern))
    )

    if filters.min_subscribers is not None:
        stmt = stmt.where(SearchableChannel.subscribers >= filters.min_subscribers)
    if filters.max_subscribers is not None:
        stmt = stmt.where(SearchableChannel.subscribers <= filters.max_subscribers)

    stmt = stmt.order_by(SearchableChannel.engagement_rate.desc())

    result = await session.execute(stmt)
    return list(result.scalars().all())

