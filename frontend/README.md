# TaskBoard Frontend

Next.js 16+ frontend for the TaskBoard application.

## Setup

```bash
npm install
npm run dev
```

App runs at `http://localhost:3000`

---

## Required Components

Build these sections to match `implementation.png`:

### 1. Header
- Logo ("TaskBoard")
- Search bar (centered)
- Icons: notifications, user avatar

### 2. Sidebar
- Workspace selector ("OnPoint Studio")
- "+ Add New" button
- Nav items: Dashboard, Inbox (with count badge), Teams, Analytics, Settings
- Projects tree with expandable folders
- Footer: "Invite Team", "Help" buttons

### 3. Project Header
- Project title with edit icon
- View tabs: Overview, List, **Board** (active), Calendar, Files
- Filter bar: Due Date, Assignee, Priority, Advance Filters
- "+ Add New" button

### 4. Kanban Board
Four columns:
| Status | Color |
|--------|-------|
| Pending | Gray |
| In Progress | Yellow |
| Completed | Green |
| Launched | Purple |

### 5. Task Card
Each card displays:
- Title
- Assignee avatars
- Due date (e.g., "March 17 - 09:00AM")
- Priority flag (Normal/High)

---

## API Integration

Backend runs at `http://localhost:8000`

```typescript
// Fetch tasks
GET /tasks

// Create task
POST /tasks

// Update task (e.g., change status)
PUT /tasks/{id}

// Delete task
DELETE /tasks/{id}
```

---

## Style Guidelines

- Use Tailwind CSS utilities extensively
- Match colors, spacing, and typography from the design
- You can use additional UI libraries if required
