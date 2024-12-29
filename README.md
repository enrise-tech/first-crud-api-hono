# First CRUD API With HONO 🔥

# 🚀 Episode 3: Build Your First CRUD API (Tasks API Tutorial)

Welcome to **Episode 3** of our video tutorial series! In this episode, we’ll guide you through creating a simple CRUD (Create, Read, Update, Delete) API using the **Tasks API**. This API is built with the lightweight **Hono** framework and **Drizzle ORM**, and it connects to a SQLite database.

---

## 🌟 Features

- **Create** tasks with a title and description.
- **Read** all tasks or a specific task by ID.
- **Update** task details like title or description.
- **Delete** tasks you no longer need.
- Built with modern web tools:
  - **Hono** for fast and lightweight routing.
  - **Drizzle ORM** for easy database interactions.

---

## 🛠️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/enrise-tech/first-crud-api-hono.git
cd first-crud-api-hono


2. Install Dependencies
Ensure you have Node.js and yarn installed, then run:

bash
Copy code
yarn install

3. Configure the Database
This project uses SQLite by default. The database configuration is in drizzle.config.ts.

4. Generate and Apply Migrations
Run the following commands to generate and apply the database schema:

bash
Copy code
yarn db:generate
yarn db:push
5. Start the Development Server
Launch the API server:

bash
Copy code
yarn dev
The API will be available at http://localhost:5173.

📚 API Endpoints
1. Get All Tasks
Retrieve a list of all tasks.

Endpoint: GET /tasks
Response:
json
Copy code
[
  { "id": 1, "title": "Sample Task", "description": "This is a sample task." }
]
2. Get a Single Task
Retrieve details of a specific task by ID.

Endpoint: GET /tasks/:id
Response:
json
Copy code
{ "id": 1, "title": "Sample Task", "description": "This is a sample task." }
3. Create a Task
Add a new task.

Endpoint: POST /tasks
Body:
json
Copy code
{ "title": "New Task", "description": "Details of the new task." }
Response:
json
Copy code
{ "id": 2, "title": "New Task", "description": "Details of the new task." }
4. Update a Task
Update an existing task's details.

Endpoint: PUT /tasks/:id
Body:
json
Copy code
{ "title": "Updated Task", "description": "Updated details." }
Response:
json
Copy code
{ "id": 1, "title": "Updated Task", "description": "Updated details." }
5. Delete a Task
Remove a task by ID.

Endpoint: DELETE /tasks/:id
Response:
json
Copy code
{ "message": "Task deleted successfully." }

🤝 Contributing
Feel free to contribute! Fork the repo, create a branch, and submit a pull request. Bug reports, feature requests, and feedback are always welcome. 😊



