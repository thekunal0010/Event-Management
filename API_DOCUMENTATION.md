# EventHub API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

---

## 🔐 Authentication Endpoints

### Register User
**POST** `/auth/register`

Request body:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

Response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "createdEvents": [],
    "joinedEvents": [],
    "completedEvents": []
  }
}
```

### Login User
**POST** `/auth/login`

Request body:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "message": "Logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
  }
}
```

### Get Current User
**GET** `/auth/me` (Protected)

Response:
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1-555-123-4567",
    "bio": "Tech enthusiast",
    "avatar": "/uploads/avatar-123.jpg",
    "createdEvents": [...],
    "joinedEvents": [...],
    "completedEvents": [...]
  }
}
```

### Update User Profile
**PUT** `/auth/profile` (Protected)

Request body (multipart/form-data):
```
firstName: "John"
lastName: "Doe"
phone: "+1-555-123-4567"
bio: "Updated bio"
avatar: <file>
```

Response:
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": { ... }
}
```

### Get User by ID
**GET** `/auth/user/:id`

Response:
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "createdEvents": [...],
    "joinedEvents": [...]
  }
}
```

---

## 📅 Event Endpoints

### Get All Events
**GET** `/events`

Query Parameters:
- `page` (default: 1)
- `limit` (default: 10)
- `category` (optional): Technology, Business, Entertainment, etc.
- `search` (optional): Search term

Example: `/events?page=1&limit=10&category=Technology&search=workshop`

Response:
```json
{
  "success": true,
  "events": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "React Workshop",
      "description": "Learn React",
      "category": "Technology",
      "startDate": "2024-06-15T10:00:00Z",
      "endDate": "2024-06-15T14:00:00Z",
      "location": "San Francisco",
      "maxParticipants": 50,
      "currentParticipants": 25,
      "status": "Upcoming",
      "image": "/uploads/event-123.jpg",
      "organizer": {
        "_id": "507f1f77bcf86cd799439011",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com"
      }
    }
  ],
  "totalEvents": 100,
  "totalPages": 10,
  "currentPage": 1
}
```

### Get Event by ID
**GET** `/events/:id`

Response:
```json
{
  "success": true,
  "event": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "React Workshop",
    "description": "Learn React",
    "category": "Technology",
    "startDate": "2024-06-15T10:00:00Z",
    "endDate": "2024-06-15T14:00:00Z",
    "location": "San Francisco",
    "maxParticipants": 50,
    "currentParticipants": 25,
    "status": "Upcoming",
    "image": "/uploads/event-123.jpg",
    "participants": [...],
    "organizer": { ... }
  }
}
```

### Create Event
**POST** `/events/create` (Protected)

Request body (multipart/form-data):
```
title: "React Workshop"
description: "Learn React concepts"
category: "Technology"
startDate: "2024-06-15T10:00:00"
endDate: "2024-06-15T14:00:00"
location: "San Francisco"
maxParticipants: 50
image: <file>
```

Response:
```json
{
  "success": true,
  "message": "Event created successfully",
  "event": { ... }
}
```

### Update Event
**PUT** `/events/:id` (Protected)

Request body (multipart/form-data):
```
title: "React Workshop 2024"
description: "Updated description"
category: "Technology"
startDate: "2024-06-15T10:00:00"
endDate: "2024-06-15T14:00:00"
location: "San Francisco"
maxParticipants: 60
image: <file> (optional)
```

Response:
```json
{
  "success": true,
  "message": "Event updated successfully",
  "event": { ... }
}
```

### Delete Event
**DELETE** `/events/:id` (Protected)

Response:
```json
{
  "success": true,
  "message": "Event deleted successfully"
}
```

### Join Event
**POST** `/events/:id/join` (Protected)

Response:
```json
{
  "success": true,
  "message": "Successfully joined the event",
  "event": { ... }
}
```

### Leave Event
**POST** `/events/:id/leave` (Protected)

Response:
```json
{
  "success": true,
  "message": "Successfully left the event",
  "event": { ... }
}
```

### Get User's Events
**GET** `/events/user-events` (Protected)

Response:
```json
{
  "success": true,
  "createdEvents": [...],
  "joinedEvents": [...],
  "completedEvents": [...]
}
```

### Get Event Statistics
**GET** `/events/stats` (Protected)

Response:
```json
{
  "success": true,
  "stats": {
    "createdEvents": 5,
    "joinedEvents": 12,
    "upcomingJoined": 3
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Please fill in all fields"
}
```

### 401 Unauthorized
```json
{
  "message": "Invalid email or password"
}
```

### 403 Forbidden
```json
{
  "message": "Unauthorized to update this event"
}
```

### 404 Not Found
```json
{
  "message": "Event not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error",
  "error": {}
}
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## Testing with Postman/Insomnia

1. **Set base URL**: `http://localhost:5000/api`
2. **Get token**: Login with POST `/auth/login`
3. **Set Authorization**: Add Bearer token to Authorization header
4. **Test endpoints**: Use the token for protected routes

---

## Rate Limiting

Currently no rate limiting is implemented. Consider implementing for production using:
- `express-rate-limit`
- `redis` for distributed rate limiting

---

## CORS Configuration

The API accepts requests from:
- `http://localhost:3000` (development)
- `http://localhost:3001` (alternative development)
- Configured via `FRONTEND_URL` in `.env`

---

## Pagination

Events are paginated with default limit of 10 items per page.

Query: `/events?page=2&limit=20`

---

## Filtering & Search

### By Category
```
/events?category=Technology
```

### By Search Term
```
/events?search=workshop
```

### Combined
```
/events?category=Technology&search=React&page=1&limit=10
```

---

Generated: 2024
EventHub API Documentation v1.0
