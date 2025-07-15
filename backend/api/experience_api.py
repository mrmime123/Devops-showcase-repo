from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.schemas import experience_schema as schemas
from backend.crud import experience_crud as crud
from backend.database import get_db

router = APIRouter()

@router.get("/", response_model=list[schemas.Experience])
def read_experiences(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    experiences = crud.get_experiences(db, skip=skip, limit=limit)
    return experiences