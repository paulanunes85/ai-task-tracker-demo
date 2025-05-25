# AI Task Tracker API Documentation

## Base URL
```
https://your-api-domain.azurewebsites.net
```

For local development:
```
http://localhost:3001
```

## Authentication
Currently, the API does not require authentication. In production, you should implement proper authentication.

## Endpoints

### Health Check
```http
GET /health
```

Returns the health status of the API.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-20T10:30:00.000Z"
}
```

### Tasks

#### Get All Tasks
```http
GET /api/tasks
```

Returns all tasks ordered by creation date (newest first).

**Response:**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Complete quarterly report",
    "description": "Analyze Q4 financial data",
    "category": "Work",
    "priority": "High",
    "status": "pending",
    "ai_suggested_category": "Work",
    "ai_suggested_priority": "High",
    "created_at": "2024-01-20T10:00:00.000Z",
    "updated_at": "2024-01-20T10:00:00.000Z"
  }
]
```

#### Get Task by ID
```http
GET /api/tasks/:id
```

Returns a specific task by ID.

**Parameters:**
- `id` (UUID): The task ID

**Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Complete quarterly report",
  "description": "Analyze Q4 financial data",
  "category": "Work",
  "priority": "High",
  "status": "pending",
  "ai_suggested_category": "Work",
  "ai_suggested_priority": "High",
  "created_at": "2024-01-20T10:00:00.000Z",
  "updated_at": "2024-01-20T10:00:00.000Z"
}
```

#### Create Task
```http
POST /api/tasks
```

Creates a new task with AI-powered categorization.

**Request Body:**
```json
{
  "title": "Review project proposal",
  "description": "Review and provide feedback on Q1 project proposal"
}
```

**Response:**
```json
{
  "id": "650e8400-e29b-41d4-a716-446655440001",
  "title": "Review project proposal",
  "description": "Review and provide feedback on Q1 project proposal",
  "category": "Work",
  "priority": "Medium",
  "status": "pending",
  "ai_suggested_category": "Work",
  "ai_suggested_priority": "Medium",
  "created_at": "2024-01-20T11:00:00.000Z",
  "updated_at": "2024-01-20T11:00:00.000Z"
}
```

#### Update Task
```http
PUT /api/tasks/:id
```

Updates an existing task.

**Parameters:**
- `id` (UUID): The task ID

**Request Body:**
```json
{
  "title": "Updated task title",
  "description": "Updated description",
  "status": "in_progress"
}
```

**Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Updated task title",
  "description": "Updated description",
  "category": "Work",
  "priority": "High",
  "status": "in_progress",
  "ai_suggested_category": "Work",
  "ai_suggested_priority": "High",
  "created_at": "2024-01-20T10:00:00.000Z",
  "updated_at": "2024-01-20T11:30:00.000Z"
}
```

#### Delete Task
```http
DELETE /api/tasks/:id
```

Deletes a task.

**Parameters:**
- `id` (UUID): The task ID

**Response:**
```
204 No Content
```

#### Get AI Suggestions
```http
POST /api/tasks/ai-suggest
```

Get AI-powered categorization and priority suggestions without creating a task.

**Request Body:**
```json
{
  "title": "Prepare presentation for client meeting",
  "description": "Create slides for tomorrow's client meeting about Q1 goals"
}
```

**Response:**
```json
{
  "category": "Work",
  "priority": "High",
  "reasoning": "Task involves client meeting preparation with a near deadline"
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "errors": [
    {
      "msg": "Title is required",
      "param": "title",
      "location": "body"
    }
  ]
}
```

### 404 Not Found
```json
{
  "error": "Task not found"
}
```

### 500 Internal Server Error
```json
{
  "error": {
    "message": "Internal Server Error",
    "status": 500,
    "timestamp": "2024-01-20T10:30:00.000Z"
  }
}
```

## Status Values
- `pending`: Task is not started
- `in_progress`: Task is being worked on
- `completed`: Task is finished

## Categories
- `Work`: Work-related tasks
- `Personal`: Personal tasks
- `Urgent`: Urgent tasks requiring immediate attention
- `Learning`: Educational or skill development tasks

## Priorities
- `High`: Must be completed soon
- `Medium`: Should be completed in reasonable time
- `Low`: Can be completed when time permits