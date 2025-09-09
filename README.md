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
