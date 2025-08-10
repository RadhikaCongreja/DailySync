from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from .database import SessionLocal, engine
from . import models, schemas, crud, auth
from .auth import create_access_token, get_current_user
from .database import get_db
from fastapi import Path
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

# Create all database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
@app.get("/")
def serve_frontend():
    return FileResponse("static/index.html")

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Your frontend origin (React, etc.)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get DB session
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# -----------------------------------------------
# 🔐 User Authentication Endpoints
# -----------------------------------------------

@app.post("/sign-up", response_model=schemas.UserOut)
def sign_up(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)


# @app.post("/sign-in", response_model=schemas.Token)
# def sign_in(
#     form_data: OAuth2PasswordRequestForm = Depends(),
#     db: Session = Depends(get_db)
# ):
@app.post("/token", response_model=schemas.Token)
def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = crud.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    access_token = create_access_token({"sub": user.email})
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

# -----------------------------------------------
# ✅ Todo Management Endpoints
# -----------------------------------------------

@app.post("/todos", response_model=schemas.Todo)
def create_todo(
    todo: schemas.TodoCreate,
    db: Session = Depends(get_db),
    current_user: schemas.UserOut = Depends(get_current_user)
):
    return crud.create_user_todo(db=db, todo=todo, user_id=current_user.id)


@app.get("/todos", response_model=list[schemas.Todo])
def get_todos(
    db: Session = Depends(get_db),
    current_user: schemas.UserOut = Depends(get_current_user)
    
):
    return crud.get_user_todos(db=db, user_id=current_user.id)


# -----------------------------------------------
# Optional Testing Endpoint
# -----------------------------------------------

@app.get("/verify-token")
def verify_token_endpoint(token: str = Depends(auth.oauth2_scheme)):
    payload = auth.verify_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    return {"message": "Token is valid", "user": payload.get("sub")}

# To run this server:
# uvicorn backend.main:app --reload --port 8001


# -----------------------------------------------
# ✅ Todo Update Endpoints
# -----------------------------------------------

# @app.patch("/todos/{todo_id}", response_model=schemas.Todo)
# def update_todo(
#     todo_id: int = Path(..., description="ID of the todo to update"),
#     todo_update: schemas.TodoUpdate = Depends(),
#     db: Session = Depends(get_db),
#     current_user: schemas.UserOut = Depends(get_current_user)
# ):
#     updated = crud.update_user_todo(db, todo_id, todo_update, user_id=current_user.id)
#     if updated is None:
#         raise HTTPException(status_code=404, detail="Todo not found or not authorized")
#     return updated


# If the above doesn't work, try this alternative approach in main.py:

from fastapi import Body

@app.patch("/todos/{todo_id}", response_model=schemas.Todo)
def update_todo(
    todo_id: int = Path(..., description="ID of the todo to update"),
    update_data: dict = Body(...),  # Accept raw dict instead of Pydantic model
    db: Session = Depends(get_db),
    current_user: schemas.UserOut = Depends(get_current_user)
):
    print(f"API: Raw update data received: {update_data}")
    
    # Manually create TodoUpdate object
    todo_update = schemas.TodoUpdate(
        title=update_data.get("title"),
        is_completed=update_data.get("is_completed")
    )
    
    print(f"API: Created TodoUpdate: {todo_update}")
    
    updated = crud.update_user_todo(db, todo_id, todo_update, user_id=current_user.id)
    if updated is None:
        raise HTTPException(status_code=404, detail="Todo not found or not authorized")
    
    print(f"API: Returning: {updated}")

    return updated
