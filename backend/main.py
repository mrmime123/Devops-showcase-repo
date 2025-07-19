from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.init_data import init_db  # Importamos la función de inicialización de la base de datos

from backend.api import experience_api, skills_api, contact_api  # Importamos los routers modularizados

app = FastAPI()

init_db()

# Middleware para CORS (ajustar allow_origins en producción)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cambiar a la URL frontend en producción
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir routers con prefijos y tags para la documentación
app.include_router(experience_api.router, prefix="/api/experiences", tags=["experiences"])
app.include_router(skills_api.router, prefix="/api/skills", tags=["skills"])
app.include_router(contact_api.router, prefix="/api/contact", tags=["contact"])
