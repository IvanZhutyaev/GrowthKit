from pydantic import BaseModel


class GeneratePostRequest(BaseModel):
    user_id: int
    channel_id: int
    topic: str
    tone: str | None = None
    length: str | None = None


class GeneratedPostRead(BaseModel):
    id: int
    channel_id: int
    content: str

    class Config:
        from_attributes = True

