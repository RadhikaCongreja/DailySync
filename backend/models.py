# from sqlalchemy import Column, Integer, String, Boolean
# from .database import Base
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from .database import Base

class Todo(Base):
    __tablename__ = "todos"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    is_completed = Column(Boolean, default=False)
    owner_id = Column(Integer, ForeignKey("users.id"))  # Assuming your users table is named 'users'
    
    # Relationship to User
    owner = relationship("User", back_populates="todos")

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True)
    hashed_password = Column(String(255))
    is_active = Column(Boolean, default=True)
    full_name = Column(String(100), nullable=True)

    # Relationship to Todo
    todos = relationship("Todo", back_populates="owner")