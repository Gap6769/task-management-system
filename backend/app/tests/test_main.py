import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.database import users_collection, tasks_collection

client = TestClient(app)

@pytest.fixture(autouse=True)
def setup_and_teardown():
    # Limpiar la base de datos antes de cada prueba
    users_collection.delete_many({})
    tasks_collection.delete_many({})

def test_register_user():
    response = client.post(
        "/register",
        json={
            "username": "testuser",
            "full_name": "Test User",
            "email": "testuser@example.com",
            "password": "testpassword"
        }
    )
    assert response.status_code == 200
    assert response.json() == {"message": "User registered successfully"}

def test_login_for_access_token():
    client.post(
        "/register",
        json={
            "username": "testuser",
            "full_name": "Test User",
            "email": "testuser@example.com",
            "password": "testpassword"
        }
    )
    
    response = client.post(
        "/token",
        data={"username": "testuser", "password": "testpassword"},
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )
    assert response.status_code == 200
    assert "access_token" in response.json()
    assert response.json()["token_type"] == "bearer"

def get_access_token():
    # Registra al usuario si no está registrado
    client.post(
        "/register",
        json={
            "username": "testuser",
            "full_name": "Test User",
            "email": "testuser@example.com",
            "password": "testpassword"
        }
    )
    # Intenta obtener un token de acceso
    response = client.post(
        "/token",
        data={"username": "testuser", "password": "testpassword"},
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )
    assert response.status_code == 200
    return response.json()["access_token"]

def test_create_task():
    access_token = get_access_token()

    response = client.post(
        "/tasks",
        json={"title": "Test Task", "description": "This is a test task", "status": "por hacer"},
        headers={"Authorization": f"Bearer {access_token}"}
    )
    assert response.status_code == 200
    assert "id" in response.json()

def test_get_tasks():
    access_token = get_access_token()

    response = client.get(
        "/tasks",
        headers={"Authorization": f"Bearer {access_token}"}
    )
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_update_task():
    access_token = get_access_token()

    create_response = client.post(
        "/tasks",
        json={"title": "Test Task", "description": "This is a test task", "status": "por hacer"},
        headers={"Authorization": f"Bearer {access_token}"}
    )
    task_id = create_response.json()["id"]

    response = client.put(
        f"/tasks/{task_id}",
        json={"status": "en progreso"},  # Asegúrate de que el valor coincide con el enumerado
        headers={"Authorization": f"Bearer {access_token}"}
    )
    assert response.status_code == 200
    assert response.json()["message"] == "Task updated successfully"

def test_delete_task():
    access_token = get_access_token()

    create_response = client.post(
        "/tasks",
        json={"title": "Test Task", "description": "This is a test task", "status": "por hacer"},
        headers={"Authorization": f"Bearer {access_token}"}
    )
    task_id = create_response.json()["id"]

    response = client.delete(
        f"/tasks/{task_id}",
        headers={"Authorization": f"Bearer {access_token}"}
    )
    assert response.status_code == 200
    assert response.json()["message"] == "Task deleted successfully"