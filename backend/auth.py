from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import JWTError, jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from . import crud, models, schemas
from .database import SessionLocal, engine
from .database import get_db


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str):
    print(f"Comparing: {plain_password} with hash: {hashed_password}")  # Debug line
    try:
        result = pwd_context.verify(plain_password, hashed_password)
        print(f"Verification result: {result}")  # Debug line
        return result
    except Exception as e:
        print(f"Verification error: {e}")  # Debug line
        return False


def get_password_hash(password: str):
    return pwd_context.hash(password)  # Always use bcrypt


# Add these constants at the top
SECRET_KEY = "your-secret-key-here"  # Change this!
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Add this new function
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=30)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError as e:
        print(f"Token verification failed: {str(e)}")
        return None

######


# def get_current_user(db: Session, token: str):
#     credentials_exception = HTTPException(
#         status_code=401,
#         detail="Could not validate credentials"
#     )
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         email: str = payload.get("sub")
#         if email is None:
#             raise credentials_exception
#     except JWTError:
#         raise credentials_exception
    
#     user = crud.get_user_by_email(db, email=email)
#     if user is None:
#         raise credentials_exception
#     return user

# def get_current_user(db: Session = SessionLocal, token: str = Depends(oauth2_scheme)):
def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = verify_token(token)
        if payload is None:
            raise credentials_exception
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = crud.get_user_by_email(db, email=email)
    if user is None:
        raise credentials_exception
    return user