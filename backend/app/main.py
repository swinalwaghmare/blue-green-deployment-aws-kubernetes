from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import health, chat

app = FastAPI(title="PingBoard API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(chat.router)

@app.get("/")
async def root():
    return {"message": "PingBoard is alive"}