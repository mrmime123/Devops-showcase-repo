from fastapi import APIRouter, Request
from aiokafka import AIOKafkaProducer
from dotenv import load_dotenv
import os
import json

load_dotenv()

router = APIRouter()
bootstrap_servers = os.getenv("KAFKA_BOOTSTRAP_SERVERS", "kafka:9092")
producer: AIOKafkaProducer = None 


@router.on_event("startup")
async def startup_event():
    global producer
    producer = AIOKafkaProducer(bootstrap_servers=bootstrap_servers)
    await producer.start()


@router.on_event("shutdown")
async def shutdown_event():
    global producer
    await producer.stop()


@router.post("/")
async def contact(request: Request):
    global producer
    data = await request.json()
    await producer.send_and_wait("contact-messages", json.dumps(data).encode("utf-8"))
    return {"status": "ok"}
