import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient
from httpx import AsyncClient, ASGITransport
from main import app

# Usar TestClient para arrancar la aplicación
@pytest.fixture(scope="module")
def test_app():
    client = TestClient(app)
    yield client

@pytest.mark.asyncio
async def test_create_task(test_app):
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.post("/tasks", json={"title": "Test Task", "description": "This is a test task", "status": "por hacer"})
    assert response.status_code == 200
    assert "id" in response.json()

@pytest.mark.asyncio
async def test_get_tasks(test_app):
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/tasks")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

@pytest.mark.asyncio
async def test_update_task(test_app):
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        create_response = await ac.post("/tasks", json={"title": "Test Task", "description": "This is a test task", "status": "por hacer"})
        task_id = create_response.json()["id"]

        response = await ac.put(f"/tasks/{task_id}", json={"status": "en progreso"})
    assert response.status_code == 200
    assert response.json()["message"] == "Task updated successfully"

@pytest.mark.asyncio
async def test_delete_task(test_app):
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        create_response = await ac.post("/tasks", json={"title": "Test Task", "description": "This is a test task", "status": "por hacer"})
        task_id = create_response.json()["id"]

        response = await ac.delete(f"/tasks/{task_id}")
    assert response.status_code == 200
    assert response.json()["message"] == "Task deleted successfully"