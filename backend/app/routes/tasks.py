import json
import uuid
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

from app.database import get_db

router = APIRouter(prefix="/tasks", tags=["tasks"])


class TaskCreate(BaseModel):
    title: str
    status: str
    assignees: list[str]
    dueDate: str
    priority: str
    isOverdue: Optional[bool] = False


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    status: Optional[str] = None
    assignees: Optional[list[str]] = None
    dueDate: Optional[str] = None
    priority: Optional[str] = None
    isOverdue: Optional[bool] = None


class TaskResponse(BaseModel):
    id: str
    title: str
    status: str
    assignees: list[str]
    dueDate: str
    priority: str
    isOverdue: bool


@router.get("")
def list_tasks():
    try:
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT id, title, status, assignees, due_date, priority, is_overdue FROM tasks ORDER BY id")
            rows = cursor.fetchall()
            tasks = [
                {
                    "id": row["id"],
                    "title": row["title"],
                    "status": row["status"],
                    "assignees": json.loads(row["assignees"]),
                    "dueDate": row["due_date"],
                    "priority": row["priority"],
                    "isOverdue": bool(row["is_overdue"])
                }
                for row in rows
            ]
            return tasks
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


@router.get("/{task_id}")
def get_task(task_id: str):
    try:
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT id, title, status, assignees, due_date, priority, is_overdue FROM tasks WHERE id = ?", (task_id,))
            row = cursor.fetchone()
            if row is None:
                raise HTTPException(status_code=404, detail="Task not found")
            return {
                "id": row["id"],
                "title": row["title"],
                "status": row["status"],
                "assignees": json.loads(row["assignees"]),
                "dueDate": row["due_date"],
                "priority": row["priority"],
                "isOverdue": bool(row["is_overdue"])
            }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


@router.post("", status_code=201)
def create_task(task: TaskCreate):
    try:
        with get_db() as conn:
            cursor = conn.cursor()
            task_id = str(uuid.uuid4())
            cursor.execute(
                "INSERT INTO tasks (id, title, status, assignees, due_date, priority, is_overdue) VALUES (?, ?, ?, ?, ?, ?, ?)",
                (task_id, task.title, task.status, json.dumps(task.assignees), task.dueDate, task.priority, int(task.isOverdue or False))
            )
            return {
                "id": task_id,
                "title": task.title,
                "status": task.status,
                "assignees": task.assignees,
                "dueDate": task.dueDate,
                "priority": task.priority,
                "isOverdue": task.isOverdue or False
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


@router.put("/{task_id}")
def update_task(task_id: str, task: TaskUpdate):
    try:
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT id, title, status, assignees, due_date, priority, is_overdue FROM tasks WHERE id = ?", (task_id,))
            row = cursor.fetchone()
            if row is None:
                raise HTTPException(status_code=404, detail="Task not found")
            
            updated_title = task.title if task.title is not None else row["title"]
            updated_status = task.status if task.status is not None else row["status"]
            updated_assignees = json.dumps(task.assignees) if task.assignees is not None else row["assignees"]
            updated_due_date = task.dueDate if task.dueDate is not None else row["due_date"]
            updated_priority = task.priority if task.priority is not None else row["priority"]
            updated_overdue = int(task.isOverdue) if task.isOverdue is not None else row["is_overdue"]
            
            cursor.execute(
                "UPDATE tasks SET title = ?, status = ?, assignees = ?, due_date = ?, priority = ?, is_overdue = ? WHERE id = ?",
                (updated_title, updated_status, updated_assignees, updated_due_date, updated_priority, updated_overdue, task_id)
            )
            
            return {
                "id": task_id,
                "title": updated_title,
                "status": updated_status,
                "assignees": json.loads(updated_assignees),
                "dueDate": updated_due_date,
                "priority": updated_priority,
                "isOverdue": bool(updated_overdue)
            }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


@router.delete("/{task_id}", status_code=204)
def delete_task(task_id: str):
    try:
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT id FROM tasks WHERE id = ?", (task_id,))
            if cursor.fetchone() is None:
                raise HTTPException(status_code=404, detail="Task not found")
            cursor.execute("DELETE FROM tasks WHERE id = ?", (task_id,))
            return None
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")