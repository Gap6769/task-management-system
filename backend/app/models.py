from pydantic import BaseModel
from typing import Optional, List
from enum import Enum
from datetime import datetime

class TaskStatus(str, Enum):
    todo = "por hacer"
    in_progress = "en progreso"
    completed = "completada"

class StatusChange(BaseModel):
    status: TaskStatus
    timestamp: datetime

class Task(BaseModel):
    id: Optional[str] = None
    title: str
    description: str
    status: TaskStatus
    last_status_change: Optional[datetime] = None
    status_history: List[StatusChange] = []

class TaskUpdate(BaseModel):
    title: str
    description: str
    status: TaskStatus