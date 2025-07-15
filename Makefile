.PHONY: setup run clean

VENV_NAME=venv
BACKEND_DIR=./backend
VENV_PATH=$(BACKEND_DIR)/$(VENV_NAME)

setup:
	@echo "🔧 Creando entorno virtual en $(BACKEND_DIR)/$(VENV_NAME)..."
	python -m venv $(VENV_PATH)
	@echo "✅ Entorno virtual creado."
	@echo "📦 Instalando dependencias..."
	$(VENV_PATH)/bin/pip install --upgrade pip
	$(VENV_PATH)/bin/pip install fastapi uvicorn sqlalchemy psycopg2-binary pydantic
	@echo "📝 Generando requirements.txt..."
	$(VENV_PATH)/bin/pip freeze > $(BACKEND_DIR)/requirements.txt
	@echo "✅ Setup completo. Usa 'source $(VENV_PATH)/bin/activate' para activar."

run:
	@echo "🚀 Iniciando servidor FastAPI desde $(BACKEND_DIR)..."
	$(VENV_PATH)/bin/uvicorn backend.main:app --reload

clean:
	@echo "🧹 Eliminando entorno virtual y archivos temporales..."
	rm -rf $(VENV_PATH) $(BACKEND_DIR)/__pycache__ $(BACKEND_DIR)/.pytest_cache $(BACKEND_DIR)/*.pyc $(BACKEND_DIR)/*.pyo $(BACKEND_DIR)/requirements.txt

backend_build:
	docker build -f backend/Dockerfile -t backend .

frontend_build:
	docker build -f frontend/Dockerfile -t frontend .

up_infra:
	docker compose up --build
	
down_infra:
	docker compose down