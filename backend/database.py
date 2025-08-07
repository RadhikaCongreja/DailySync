from sqlalchemy.orm import declarative_base
from sqlalchemy import create_engine, text  # Added text import
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "mysql+pymysql://todo_user:12341234@localhost/bootcamp_todo_app"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

try:
    with engine.connect() as connection:
        print("✅ Successfully connected to the database!")
        
        # Correct way to execute raw SQL
        result = connection.execute(text("SELECT DATABASE()"))
        current_db = result.scalar()  # Changed from fetchone()[0] to scalar()
        print(f"Current database: {current_db}")
except Exception as e:
    print(f"❌ Connection failed: {e}")



######

from sqlalchemy.orm import Session

# Add this
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()