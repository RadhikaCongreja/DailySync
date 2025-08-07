from pydantic import BaseModel, EmailStr
# from pydantic import BaseModel
from typing import Optional

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str | None = None

class UserOut(BaseModel):
    id: int
    email: EmailStr
    full_name: str | None
    is_active: bool

    class Config:
        from_attributes = True

# Add these new schemas
class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

# class TokenData(BaseModel):
#     email: Optional[str] = None


#####
class TodoBase(BaseModel):
    title: str
    is_completed: bool = False

class TodoCreate(TodoBase):
    pass

class Todo(TodoBase):
    id: int
    owner_id: int
    
    class Config:
        from_attributes = True

######
# class TodoUpdate(BaseModel):
#     title: str | None = None
#     is_completed: bool | None = None

# Replace your TodoUpdate class in schemas.py with this:

class TodoUpdate(BaseModel):
    title: Optional[str] = None
    is_completed: Optional[bool] = None

    class Config:
        # This helps with debugging
        extra = "forbid"  # Reject unknown fields
        
    def __str__(self):
        return f"TodoUpdate(title={self.title}, is_completed={self.is_completed})"



