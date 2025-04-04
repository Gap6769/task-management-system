from fastapi import APIRouter, HTTPException, Depends, Body
from bson import ObjectId
from app.models import Task, TaskStatus, TaskUpdate, StatusChange
from app.database import tasks_collection
from app.routes.auth import oauth2_scheme
from datetime import datetime

router = APIRouter()

@router.get("/health")
def is_healthy():
    return {"status": "healthy"}

@router.get("/tasks")
async def get_tasks():
    tasks = list(tasks_collection.find())
    for task in tasks:
        task["id"] = str(task["_id"])
        del task["_id"]
    return tasks

@router.post("/tasks")
async def create_task(task: Task, token: str = Depends(oauth2_scheme)):
    task_dict = task.dict(exclude_unset=True)
    task_dict["status"] = task_dict["status"].value
    task_dict["status_history"] = [
        {"status": task_dict["status"], "timestamp": datetime.utcnow()}
    ]
    result = tasks_collection.insert_one(task_dict)
    task.id = str(result.inserted_id)
    return task

@router.put("/tasks/{task_id}")
async def update_task(task_id: str, task: TaskUpdate):
    current_task = tasks_collection.find_one({"_id": ObjectId(task_id)})
    if not current_task:
        raise HTTPException(status_code=404, detail="Task not found")

    task_dict = task.dict()
    if current_task["status"] != task.status.value:
        task_dict["last_status_change"] = datetime.utcnow()
        task_dict["status_history"] = current_task.get("status_history", [])
        task_dict["status_history"].append(
            {"status": task.status.value, "timestamp": task_dict["last_status_change"]}
        )

    result = tasks_collection.update_one(
        {"_id": ObjectId(task_id)},
        {"$set": task_dict}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Task not found")

    updated_task = tasks_collection.find_one({"_id": ObjectId(task_id)})
    updated_task["id"] = str(updated_task["_id"])
    del updated_task["_id"]

    return updated_task

@router.delete("/tasks/{task_id}")
async def delete_task(task_id: str, token: str = Depends(oauth2_scheme)):
    result = tasks_collection.delete_one({"_id": ObjectId(task_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task deleted successfully"}
