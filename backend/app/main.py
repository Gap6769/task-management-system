from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.tasks import router as tasks_router
from app.routes.auth import auth_router
from mangum import Mangum

app = FastAPI()


# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir el origen de tu frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/auth")
app.include_router(tasks_router, prefix="/api")

@app.get("/health")
def is_healthy():
    return {"status": "healthy"}

@app.get("/")
def read_root():
    return {"message": "Hello World"}
# Adaptador de Mangum para Lambda


handler = Mangum(app, lifespan="auto")
