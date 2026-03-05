from pydantic import BaseModel


class ChannelSearchFilters(BaseModel):
    query: str
    min_subscribers: int | None = None
    max_subscribers: int | None = None


class ChannelSearchResult(BaseModel):
    id: int
    telegram_id: int
    title: str
    username: str | None
    subscribers: int
    engagement_rate: float

    class Config:
        from_attributes = True

