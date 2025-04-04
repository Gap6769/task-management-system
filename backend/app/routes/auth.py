from fastapi import APIRouter, HTTPException, status, Depends, Body
from pydantic import BaseModel
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from fastapi.security import OAuth2PasswordBearer
from bson import ObjectId
from app.database import users_collection


# Configuración para JWT
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Contexto de contraseña
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Esquema de autenticación
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

auth_router = APIRouter()

class User(BaseModel):
    username: str
    full_name: str
    email: str
    password: str

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_user(username_or_email: str):
    user = users_collection.find_one({"$or": [{"username": username_or_email}, {"email": username_or_email}]})
    if user:
        user["id"] = str(user["_id"])
        del user["_id"]
    return user

def authenticate_user(username_or_email: str, password: str):
    user = get_user(username_or_email)
    if not user:
        return False
    if not verify_password(password, user["hashed_password"]):
        return False
    return user

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta if expires_delta else timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@auth_router.get("/health")
def is_healthy():
    return {"status": "healthy"}

@auth_router.post("/register", response_model=dict)
async def register_user(user: User):
    if users_collection.find_one({"$or": [{"username": user.username}, {"email": user.email}]}):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username or email already registered",
        )
    hashed_password = pwd_context.hash(user.password)
    user_dict = user.dict()
    user_dict["hashed_password"] = hashed_password
    del user_dict["password"]
    users_collection.insert_one(user_dict)
    return {"message": "User registered successfully"}

@auth_router.post("/token")
async def login_for_access_token(data: dict = Body(...)):
    username_or_email = data.get("identifier")
    password = data.get("password")

    if not username_or_email or not password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Identifier and password are required",
        )

    user = authenticate_user(username_or_email, password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["username"]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@auth_router.get("/users/me")
async def read_users_me(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = get_user(username)
    if user is None:
        raise credentials_exception
    return user
