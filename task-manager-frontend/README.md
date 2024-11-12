Task Manager Backend API
This is the backend service for a Task Manager application. The API provides authentication, task management, and integrates with a simple front-end interface for easier testing.

Table of Contents
Setup Instructions
API Documentation
Assumptions
Design Decisions
Setup Instructions
1. Prerequisites
Node.js: Ensure Node.js is installed (version 12 or later).
MySQL: Install and configure MySQL for data storage.
2. Clone the Repository
Run the following commands:
git clone <repository-url>
cd <repository-name>
3. Install Dependencies
Install required dependencies by running: npm install
4. Configure Environment Variables
Create a .env file in the project root with the following variables:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=task_manager_db
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
5. Set Up the Database
Log in to MySQL and create the database:
mysql -u root -p
In MySQL:
CREATE DATABASE task_manager_db;
Exit MySQL.
6. Database Migrations (if using Sequelize migrations)
Run database migrations: npx sequelize-cli db:migrate
7. Start the Server
Start the server by running: node app.js
The server will start on http://localhost:3000
8. Testing with the Front End
A simple front-end interface is included in this repository for testing purposes.
The front end allows users to register, log in, create, view, update, and delete tasks.
To use the front end, navigate to the front end directory and follow the instructions in its README.md to start it on http://localhost:3001
API Documentation
Base URL
http://localhost:3000
Authentication Endpoints
1. Register a User
URL: /auth/register
Method: POST
Description: Register a new user.
Request Body:
username: string
email: string
password: string
Response:
201 Created: User registered successfully.
400 Bad Request: User already exists.
500 Internal Server Error: Error in registration.
2. Login a User
URL: /auth/login
Method: POST
Description: Login a user and send OTP.
Request Body:
email: string
password: string
Response:
200 OK: OTP sent to email.
400 Bad Request: Invalid email or password.
500 Internal Server Error: Error in login.
3. Verify OTP
URL: /auth/verify-otp
Method: POST
Description: Verify OTP to complete login.
Request Body:
email: string
otp: string
Response:
200 OK: OTP verified, session token issued as HTTP-only cookie.
400 Bad Request: Invalid or expired OTP.
500 Internal Server Error: Error in OTP verification.
4. Check Session
URL: /auth/check-session
Method: GET
Description: Verify if the session is active using the token cookie.
Response:
200 OK: Session is active.
401 Unauthorized: No active session.
Tasks Endpoints
1. Get User Tasks
URL: /tasks
Method: GET
Description: Get all tasks for the authenticated user.
Response:
200 OK: Returns an array of tasks.
500 Internal Server Error: Error fetching tasks.
2. Create a New Task
URL: /tasks
Method: POST
Description: Create a new task for the authenticated user.
Request Body:
title: string
description: string
due_date: YYYY-MM-DD format
status: either "in_progress" or "completed"
Response:
201 Created: Task created successfully.
500 Internal Server Error: Error creating task.
3. Update an Existing Task
URL: /tasks/:id
Method: PUT
Description: Update an existing task by ID.
Request Parameters:
id: Task ID to update.
Request Body:
title: string
description: string
due_date: YYYY-MM-DD format
status: either "in_progress" or "completed"
Response:
200 OK: Task updated successfully.
404 Not Found: Task not found.
500 Internal Server Error: Error updating task.
4. Delete a Task
URL: /tasks/:id
Method: DELETE
Description: Delete a task by ID.
Request Parameters:
id: Task ID to delete.
Response:
200 OK: Task deleted successfully.
404 Not Found: Task not found.
500 Internal Server Error: Error deleting task.
Assumptions
User Login: User sessions are managed via JWT tokens stored in HTTP-only cookies.
Task Ownership: Tasks are specific to each user; users can only see and manage their own tasks.
Data Integrity: The status field in tasks is restricted to in_progress or completed, assuming no need for additional status types.
Design Decisions
Authentication with OTP: An OTP is required during login for added security.
Task Status as ENUM: The status field in tasks is implemented as an ENUM for controlled and predictable values.
Database Migrations: Sequelize migrations are used for database schema updates, providing better version control over changes.
Frontend for Testing: A simple front-end was provided to facilitate easier testing of API endpoints for users