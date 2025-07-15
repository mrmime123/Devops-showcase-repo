# Dockerfile dentro de backend/

FROM python:3.12-slim AS base

WORKDIR /app

# Dependencias del sistema
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    curl \
 && rm -rf /var/lib/apt/lists/*

# Copiar requirements e instalar
COPY backend/requirements.txt ./backend/

RUN pip install --upgrade pip \
 && pip install --no-cache-dir -r ./backend/requirements.txt

# Copiar el resto del código
COPY backend/ ./backend/

EXPOSE 8000

CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
