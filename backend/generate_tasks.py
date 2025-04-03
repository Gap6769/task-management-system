import json
import random
from datetime import datetime, timedelta
from app.database import tasks_collection

tasks_collection.delete_many({})  # Limpia la base de datos

status_map = {
    "todo": "por hacer",
    "in_progress": "en progreso",
    "completed": "completada"
}

with open('tasks.json', 'r') as file:
    tasks_data = json.load(file)

# Simular fechas entre los últimos 30 días
start_date = datetime.today() - timedelta(days=7)

for task_data in tasks_data:
    task_data["status"] = status_map[task_data["status"]]

    # Generar una fecha aleatoria en los últimos 30 días
    random_days = random.randint(0, 7)
    task_data["last_status_change"] = (start_date + timedelta(days=random_days)).isoformat()

    for history in task_data["status_history"]:
        history["status"] = status_map[history["status"]]
        history["timestamp"] = (start_date + timedelta(days=random.randint(0, random_days))).isoformat()

    tasks_collection.insert_one(task_data)
