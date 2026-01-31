import sqlite3
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database import DATABASE_PATH


def upgrade():
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS _migrations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    
    cursor.execute("SELECT 1 FROM _migrations WHERE name = ?", ("002_create_tasks_table",))
    if cursor.fetchone():
        print("Migration 002_create_tasks_table already applied. Skipping.")
        conn.close()
        return
    
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS tasks (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            status TEXT NOT NULL,
            assignees TEXT NOT NULL,
            due_date TEXT NOT NULL,
            priority TEXT NOT NULL,
            is_overdue INTEGER DEFAULT 0
        )
    """)
    
    sample_tasks = [
        ("1", "Solutions Pages", "Pending", '["John", "Sarah"]', "March 17 - 09:00AM", "Normal Priority", 0),
        ("2", "Company Pages", "Pending", '["Mike"]', "March 17 - 09:00AM", "Normal Priority", 0),
        ("3", "Help Center Pages", "Pending", '[]', "March 17 - 09:00AM", "Normal Priority", 0),
        ("4", "Icon Custom", "Pending", '[]', "March 17 - 09:00AM", "Normal Priority", 0),
        ("5", "Illustration", "Pending", '["John", "Sarah"]', "March 17 - 09:00AM", "Normal Priority", 0),
        ("6", "Order Flow", "In Progress", '["Alex", "Emma"]', "March 17 - 09:00AM", "High Priority", 0),
        ("7", "New Work Flow", "In Progress", '["Chris"]', "March 17 - 09:00AM", "High Priority", 1),
        ("8", "About Us Illustration", "Completed", '["Sam", "Jordan"]', "March 17 - 09:00AM", "Normal Priority", 0),
        ("9", "Hero Illustration", "Completed", '["Taylor"]', "March 17 - 09:00AM", "Normal Priority", 0),
        ("10", "Moodboarding", "Completed", '["Riley"]', "March 17 - 09:00AM", "High Priority", 0),
        ("11", "Research", "Completed", '["Morgan"]', "March 17 - 09:00AM", "High Priority", 0),
        ("12", "Features Pages", "Launched", '["Jamie", "Casey"]', "March 17 - 09:00AM", "Normal Priority", 0),
    ]
    cursor.executemany(
        "INSERT INTO tasks (id, title, status, assignees, due_date, priority, is_overdue) VALUES (?, ?, ?, ?, ?, ?, ?)",
        sample_tasks
    )
    
    cursor.execute("INSERT INTO _migrations (name) VALUES (?)", ("002_create_tasks_table",))
    
    conn.commit()
    conn.close()
    print("Migration 002_create_tasks_table applied successfully.")


def downgrade():
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    cursor.execute("DROP TABLE IF EXISTS tasks")
    cursor.execute("DELETE FROM _migrations WHERE name = ?", ("002_create_tasks_table",))
    
    conn.commit()
    conn.close()
    print("Migration 002_create_tasks_table reverted successfully.")


if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Run database migration")
    parser.add_argument(
        "action",
        choices=["upgrade", "downgrade"],
        help="Migration action to perform"
    )
    
    args = parser.parse_args()
    
    if args.action == "upgrade":
        upgrade()
    elif args.action == "downgrade":
        downgrade()