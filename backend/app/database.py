from pymongo import MongoClient
import os

client = MongoClient(os.getenv("MONGODB_URI", "mongodb://localhost:27017"))
db = client.task_management
tasks_collection = db.tasks
users_collection = db.users