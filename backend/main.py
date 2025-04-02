from fastapi import FastAPI, HTTPException, Body
from pymongo import MongoClient
from bson import ObjectId
from models import Task, TaskStatus
import os

app = FastAPI()

# Conexión a MongoDB
client = MongoClient(os.getenv("MONGODB_URI"))
db = client.task_management
tasks_collection = db.tasks

@app.get("/tasks")
async def get_tasks():
    tasks = list(tasks_collection.find())
    for task in tasks:
        task["id"] = str(task["_id"])
        del task["_id"]
    return tasks

@app.post("/tasks")
async def create_task(task: Task):
    task_dict = task.model_dump(exclude_unset=True)
    task_dict["status"] = task_dict["status"].value
    result = tasks_collection.insert_one(task_dict)
    task.id = str(result.inserted_id)
    return task

@app.put("/tasks/{task_id}")
async def update_task(task_id: str, status: TaskStatus = Body(..., embed=True)):
    result = tasks_collection.update_one(
        {"_id": ObjectId(task_id)},
        {"$set": {"status": status.value}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task updated successfully"}

@app.delete("/tasks/{task_id}")
async def delete_task(task_id: str):
    result = tasks_collection.delete_one({"_id": ObjectId(task_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task deleted successfully"}