import asyncio
import os

from aiogram import Bot, Dispatcher, F
from aiogram.filters import CommandStart
from aiogram.types import Message


BOT_TOKEN_ENV_KEY = "TELEGRAM_BOT_TOKEN"


async def on_start(message: Message) -> None:
  await message.answer("GrowthKit бот готов отправлять уведомления о вашем канале.")


async def on_ping(message: Message) -> None:
  await message.answer("pong")


async def main() -> None:
  token = os.getenv(BOT_TOKEN_ENV_KEY)
  if not token:
    raise RuntimeError("TELEGRAM_BOT_TOKEN is not set")
  bot = Bot(token=token)
  dp = Dispatcher()
  dp.message.register(on_start, CommandStart())
  dp.message.register(on_ping, F.text == "/ping")
  await dp.start_polling(bot)


if __name__ == "__main__":
  asyncio.run(main())
