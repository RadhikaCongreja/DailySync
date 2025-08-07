from sqlalchemy.orm import Session
from . import models, schemas, auth
# from . import models, schemas
from .auth import get_password_hash, verify_password

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = auth.get_password_hash(user.password)  # Use the proper hasher
    db_user = models.User(
        email=user.email,
        hashed_password=hashed_password,
        full_name=user.full_name
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def authenticate_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if not user or not auth.verify_password(password, user.hashed_password):
        return None
    return user


def get_user_todos(db: Session, user_id: int):
    """Get all todos for a specific user"""
    return db.query(models.Todo).filter(models.Todo.owner_id == user_id).all()

def create_user_todo(db: Session, todo: schemas.TodoCreate, user_id: int):
    """Create a new todo for a specific user"""
    db_todo = models.Todo(**todo.model_dump(), owner_id=user_id)
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo

######
# def update_user_todo(db: Session, todo_id: int, todo_update: schemas.TodoUpdate, user_id: int):
#     db_todo = db.query(models.Todo).filter(models.Todo.id == todo_id, models.Todo.owner_id == user_id).first()
#     if not db_todo:
#         return None  # Todo not found or not owned by user

#     # Apply updates
#     if todo_update.title is not None:
#         db_todo.title = todo_update.title
#     if todo_update.is_completed is not None:
#         db_todo.is_completed = todo_update.is_completed

#     db.commit()
#     db.refresh(db_todo)
#     return db_todo


# Replace your existing update_user_todo function in crud.py with this:

def update_user_todo(db: Session, todo_id: int, todo_update: schemas.TodoUpdate, user_id: int):
    print(f"CRUD: Updating todo {todo_id} for user {user_id}")
    print(f"CRUD: Update data received: {todo_update}")
    print(f"CRUD: Title: {todo_update.title}, is_completed: {todo_update.is_completed}")
    
    db_todo = db.query(models.Todo).filter(models.Todo.id == todo_id, models.Todo.owner_id == user_id).first()
    if not db_todo:
        print(f"CRUD: Todo {todo_id} not found for user {user_id}")
        return None  # Todo not found or not owned by user

    print(f"CRUD: Before update - Title: '{db_todo.title}', is_completed: {db_todo.is_completed}")
    
    # Apply updates
    if todo_update.title is not None:
        db_todo.title = todo_update.title
        print(f"CRUD: Updated title to: '{db_todo.title}'")
        
    if todo_update.is_completed is not None:
        db_todo.is_completed = todo_update.is_completed
        print(f"CRUD: Updated is_completed to: {db_todo.is_completed}")

    try:
        db.commit()
        db.refresh(db_todo)
        print(f"CRUD: After commit - Title: '{db_todo.title}', is_completed: {db_todo.is_completed}")
        return db_todo
    except Exception as e:
        print(f"CRUD: Error during commit: {e}")
        db.rollback()
        return None
