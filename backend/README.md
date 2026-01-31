# TaskBoard API

FastAPI backend for the TaskBoard application.

## Setup
### 1. Setup Virtual Environment

```bash
python3.13 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 2. Run the Application

```bash
uvicorn app.main:app --reload
```

Server runs at `http://localhost:8000`

---

## API Contracts

### Task Model

```json
{
  "id": "string",
  "title": "string",
  "status": "pending" | "in_progress" | "completed" | "launched",
  "assignees": ["string"],
  "due_date": "string (ISO 8601)",
  "priority": "normal" | "high"
}
```

---

### Endpoints

#### GET /tasks

Fetch all tasks.

**Response:** `200 OK`
```json
[
  {
    "id": "1",
    "title": "Solutions Pages",
    "status": "pending",
    "assignees": ["user1", "user2"],
    "due_date": "2024-03-17T09:00:00",
    "priority": "normal"
  }
]
```

---

#### POST /tasks

Create a new task.

**Request Body:**
```json
{
  "title": "New Task",
  "status": "pending",
  "assignees": ["user1"],
  "due_date": "2024-03-20T09:00:00",
  "priority": "high"
}
```

**Response:** `201 Created`
```json
{
  "id": "generated-id",
  "title": "New Task",
  "status": "pending",
  "assignees": ["user1"],
  "due_date": "2024-03-20T09:00:00",
  "priority": "high"
}
```

---

#### PUT /tasks/{id}

Update an existing task.

**Request Body:** (partial update allowed)
```json
{
  "status": "in_progress"
}
```

**Response:** `200 OK`
```json
{
  "id": "1",
  "title": "Solutions Pages",
  "status": "in_progress",
  "assignees": ["user1", "user2"],
  "due_date": "2024-03-17T09:00:00",
  "priority": "normal"
}
```

**Error:** `404 Not Found` if task doesn't exist

---

#### DELETE /tasks/{id}

Delete a task.

**Response:** `204 No Content`

**Error:** `404 Not Found` if task doesn't exist

---

## Sample Data

Seed your in-memory storage with tasks matching the design:

| Title | Status | Priority |
|-------|--------|----------|
| Solutions Pages | pending | normal |
| Company Pages | pending | normal |
| Help Center Pages | pending | normal |
| Order Flow | in_progress | high |
| New Work Flow | in_progress | high |
| About Us Illustration | completed | normal |
| Hero Illustration | completed | normal |
| Moodboarding | completed | high |
| Research | completed | high |
| Features Pages | launched | normal |
