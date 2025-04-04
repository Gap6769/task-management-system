from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from dotenv import load_dotenv
import os

load_dotenv()

try:
    client = MongoClient(os.getenv("MONGODB_URI", "mongodb://localhost:27017"))

    # Attempt to access the database
    db = client.test_database
    # Perform database operations
except ConnectionFailure as e:
    print(f"Could not connect to MongoDB: {e}")

tasks_collection = db.tasks
users_collection = db.users
