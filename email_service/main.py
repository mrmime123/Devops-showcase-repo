import os
import json
import asyncio
import smtplib
from email.message import EmailMessage
from aiokafka import AIOKafkaConsumer

KAFKA_BOOTSTRAP_SERVERS = os.getenv("KAFKA_BOOTSTRAP_SERVERS", "kafka:9092")
TOPIC = "contact-messages"

EMAIL_HOST = os.getenv("EMAIL_SMTP_HOST")
EMAIL_PORT = int(os.getenv("EMAIL_SMTP_PORT", 587))
EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASSWORD")
EMAIL_RECEIVER = os.getenv("EMAIL_RECEIVER")

async def consume():
    consumer = AIOKafkaConsumer(
        TOPIC,
        bootstrap_servers=KAFKA_BOOTSTRAP_SERVERS,
        group_id="email-consumers"
    )
    await consumer.start()
    try:
        async for msg in consumer:
            data = json.loads(msg.value.decode("utf-8"))
            # --- MODIFICATION START ---
            print(f"📧 Consumed message from Kafka: {data}")
            # --- MODIFICATION END ---
            await send_email(data)
    finally:
        await consumer.stop()

async def send_email(data):
    msg = EmailMessage()
    msg["Subject"] = f"Nuevo mensaje de contacto: {data.get('name')}"
    msg["From"] = EMAIL_USER
    msg["To"] = EMAIL_RECEIVER
    msg.set_content(f"""
Nombre: {data.get("name")}
Email: {data.get("email")}
Mensaje:
{data.get("message")}
""")

    try:
        with smtplib.SMTP(EMAIL_HOST, EMAIL_PORT) as smtp:
            smtp.starttls()
            smtp.login(EMAIL_USER, EMAIL_PASS)
            smtp.send_message(msg)
        print("✅ Email enviado correctamente.")
    except Exception as e:
        print("❌ Error enviando el correo:", e)

if __name__ == "__main__":
    asyncio.run(consume())