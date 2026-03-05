from datetime import timedelta

from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from .models import ChannelMetrics
from .schemas import ChannelDashboard, DailyMetrics


async def get_channel_dashboard(session: AsyncSession, channel_id: int, days: int = 7) -> ChannelDashboard:
    today = func.current_date()
    since = today - timedelta(days=days - 1)

    stmt = (
        select(
            ChannelMetrics.date,
            ChannelMetrics.subscribers,
            ChannelMetrics.views,
            ChannelMetrics.posts,
            ChannelMetrics.reactions,
        )
        .where(
            ChannelMetrics.channel_id == channel_id,
            ChannelMetrics.date >= since,
            ChannelMetrics.date <= today,
        )
        .order_by(ChannelMetrics.date.asc())
    )

    result = await session.execute(stmt)
    rows = result.all()

    metrics: list[DailyMetrics] = []
    for row in rows:
        date_value, subscribers, views, posts, reactions = row
        if views > 0:
            er = reactions / views
        else:
            er = 0.0
        metrics.append(
            DailyMetrics(
                date=date_value,
                subscribers=subscribers,
                views=views,
                posts=posts,
                reactions=reactions,
                engagement_rate=er,
            )
        )

    if metrics:
        avg_er = sum(m.engagement_rate for m in metrics) / len(metrics)
    else:
        avg_er = 0.0

    return ChannelDashboard(channel_id=channel_id, days=metrics, average_engagement_rate=avg_er)

