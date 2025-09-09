# Course Management API

## Project overview

A Course Management REST API built with Node.js, Express.js, and MongoDB (Mongoose). Features user registration/login with JWT, roles (user/admin), course management (admin-only create/delete), course browsing, and a basic purchase system.

## Features

- JWT-based authentication (access + refresh tokens)
- Roles: `user`, `admin` (admin can create/delete courses)
- Courses: create, delete (admin), list, get by id
- Purchase: logged-in user can "purchase" a course (purchase stored with userId, courseId, amount, date)
- Input validation using `express-validator`
- Centralized error handling middleware
- MVC folder structure
- Password hashing with `bcrypt`

## Tech stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Tokens (JWT)
- bcrypt
- express-validator

## Setup / Installation

1. Clone repository:

```bash
git clone https://github.com/reazulislam1487/course-management-api.git
cd course-management-api
```

Install dependencies

npm install

Create .env file in the project root:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=10

Run the server

npm start

API will be running at 👉 http://localhost:5000

📌 API Endpoints
🔐 Auth Routes
Register
POST /api/auth/register

Request

{
"name": "Reazul Islam",
"email": "reaz@example.com",
"password": "123456"
}

Response

{
"message": "User registered successfully"
}

Login
POST /api/auth/login

Request

{
"email": "reaz@example.com",
"password": "123456"
}

Response

{
"accessToken": "jwt_access_token",
"refreshToken": "jwt_refresh_token"
}

Refresh Token
POST /api/auth/refresh

Request

{
"token": "your_refresh_token"
}

Response

{
"accessToken": "new_jwt_access_token"
}

Logout
POST /api/auth/logout
Authorization: Bearer <access_token>

Response

{
"message": "Logged out successfully"
}

📚 Course Routes
Get All Courses
GET /api/courses

Response

[
{
"_id": "64f13f",
"title": "Node.js Basics",
"description": "Learn Node.js",
"price": 100,
"instructor": "John Doe"
}
]

Get Course by ID
GET /api/courses/:id

Create Course (Admin only)
POST /api/courses
Authorization: Bearer <access_token>

Request

{
"title": "Express.js Mastery",
"description": "Deep dive into Express",
"price": 200,
"instructor": "Jane Doe"
}

Response

{
"message": "Course created successfully"
}

Delete Course (Admin only)
DELETE /api/courses/:id
Authorization: Bearer <access_token>

Response

{
"message": "Course deleted successfully"
}

🛒 Purchase Routes
Purchase a Course (User only)
POST /api/purchases/:courseId
Authorization: Bearer <access_token>

Response

{
"message": "Course purchased successfully"
}

Get My Purchases
GET /api/purchases
Authorization: Bearer <access_token>

Response

[
{
"courseId": "64f13f",
"amount": 200,
"date": "2025-09-09T12:00:00.000Z"
}
]
