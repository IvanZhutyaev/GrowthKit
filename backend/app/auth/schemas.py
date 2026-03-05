from pydantic import BaseModel


class ChannelBase(BaseModel):
    telegram_id: int
    title: str
    username: str | None = None


class ChannelCreate(ChannelBase):
    pass


class ChannelRead(ChannelBase):
    id: int

    class Config:
        from_attributes = True


class UserBase(BaseModel):
    telegram_id: int
    username: str | None = None
    first_name: str | None = None
    last_name: str | None = None


class UserCreate(UserBase):
    channel: ChannelCreate


class UserRead(UserBase):
    id: int
    channels: list[ChannelRead] = []

    class Config:
        from_attributes = True

