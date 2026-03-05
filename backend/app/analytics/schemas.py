from datetime import date

from pydantic import BaseModel


class DailyMetrics(BaseModel):
    date: date
    subscribers: int
    views: int
    posts: int
    reactions: int
    engagement_rate: float


class ChannelDashboard(BaseModel):
    channel_id: int
    days: list[DailyMetrics]
    average_engagement_rate: float

