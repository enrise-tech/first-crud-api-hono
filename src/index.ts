import "dotenv/config";
import { Hono } from "hono";
import { TaskService } from "./services/tasks";
import { UserService } from "./services/users";
import { verify, sign } from "hono/jwt";
import argon2 from "argon2";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello World!");
});

// create a users post endpoint using argon to hash the password
app.post("/users", async (c) => {
  const { username, email, password } = await c.req.json();

  if (!username || !email || !password) {
    return c.json({ message: "All fields are required" }, 400);
  }

  const hashedPassword = await argon2.hash(password);
  const newUser = await UserService.createUser(username, email, hashedPassword);

  return c.json({ message: "User created successfully", user: newUser });
});

app.post("/login", async (c) => {
  const { email, password } = await c.req.json();

  if (!email || !password) {
    return c.json({ message: "Email and password are required" }, 400);
  }

  const user = await UserService.getUserByEmail(email);
  if (!user) {
    return c.json({ message: "Invalid credentials" }, 401);
  }

  const isMatch = await argon2.verify(user.password, password);

  if (!isMatch) {
    return c.json({ message: "Invalid credentials" }, 401);
  }

  const token = await sign(
    {
      id: user.id,
      email: user.email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    "secret"
  );

  return c.json({ message: "Login successful", token });
});

app.get("/users", async (c) => {
  const allUsers = await UserService.getAllUsers();
  return c.json(allUsers);
});

app.get("/users/:id", async (c) => {
  const userId = c.req.param("id");
  const user = await UserService.getUserById(Number(userId));
  return c.json(user);
});

app.put("/users/:id", async (c) => {
  const userId = c.req.param("id");
  const { username, email, password } = await c.req.json();
  const updatedUser = await UserService.updateUser(
    Number(userId),
    username,
    email,
    password
  );
  return c.json(updatedUser);
});

app.delete("/users/:id", async (c) => {
  const userId = c.req.param("id");
  const response = await UserService.deleteUser(Number(userId));
  return c.json(response);
});

// routes/tasks.ts

app.get("/tasks", async (c) => {
  const userId = c.req.query("userId"); // Get the userId from query parameters

  let tasksList;
  if (userId) {
    tasksList = await TaskService.getTasksByUserId(Number(userId)); // Use the service layer
    if (tasksList.length === 0) {
      return c.json(
        { message: `No tasks found for user with ID ${userId}` },
        404
      );
    }
  } else {
    tasksList = await TaskService.getAllTasks(); // Use the service layer
  }

  return c.json(tasksList);
});

app.get("/tasks/:id", async (c) => {
  const taskId = c.req.param("id");
  const task = await TaskService.getTaskById(Number(taskId));

  if (!task) {
    return c.json({ message: `Task with ID ${taskId} not found` }, 404);
  }

  return c.json(task);
});

app.post("/tasks", async (c) => {
  const userId = c.req.query("userId"); // Get the userId from query parameters

  if (!userId) {
    return c.json({ message: "User ID is required" }, 400);
  }

  const { title, description } = await c.req.json();
  const newTask = await TaskService.createTask(
    Number(userId),
    title,
    description
  );

  return c.json(newTask);
});

// Delete Task
app.delete("/tasks/:id", async (c) => {
  const taskId = c.req.param("id");
  const result = await TaskService.deleteTask(Number(taskId));
  return c.json(result);
});

app.put("/tasks/:id", async (c) => {
  const taskId = c.req.param("id");
  const { title, description, status } = await c.req.json();
  const updatedTask = await TaskService.updateTask(
    Number(taskId),
    title,
    description,
    status
  );

  if (!updatedTask) {
    return c.json({ message: `Task with ID ${taskId} not found` }, 404);
  }

  return c.json(updatedTask);
});

export default app;
