from fastapi import APIRouter, HTTPException, Depends, Body
from bson import ObjectId
from app.models import Task, TaskStatus, TaskUpdate
from app.database import tasks_collection
from app.auth import oauth2_scheme

router = APIRouter()

@router.get("/tasks")
async def get_tasks():
    tasks = list(tasks_collection.find())
    for task in tasks:
        task["id"] = str(task["_id"])
        del task["_id"]
    return tasks

@router.post("/tasks")
async def create_task(task: Task, token: str = Depends(oauth2_scheme)):
    task_dict = task.dict(exclude_unset=True)  # Cambiado a dict()
    task_dict["status"] = task_dict["status"].value
    result = tasks_collection.insert_one(task_dict)
    task.id = str(result.inserted_id)
    return task

@router.put("/tasks/{task_id}")
async def update_task(task_id: str, task: TaskUpdate):
    result = tasks_collection.update_one(
        {"_id": ObjectId(task_id)},
        {"$set": task.dict()}  
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Task not found")

    updated_task = tasks_collection.find_one({"_id": ObjectId(task_id)})
    
    updated_task["id"] = str(updated_task["_id"])  # Convertimos el ObjectId a cadena
    del updated_task["_id"]  # Eliminamos el campo _id

    return updated_task

@router.delete("/tasks/{task_id}")
async def delete_task(task_id: str, token: str = Depends(oauth2_scheme)):
    result = tasks_collection.delete_one({"_id": ObjectId(task_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task deleted successfully"}
