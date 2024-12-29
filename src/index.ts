import { Hono } from 'hono'
import { db } from './db';
import { tasks } from './db/schema';
import { eq } from 'drizzle-orm';

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello World!')
})

// fetch all tasks
app.get('/tasks', async (c) => {
  const allTasks = await db.select().from(tasks)
  return c.json(allTasks)
})

// Get Task by ID
app.get('/tasks/:id', async (c) => {
  const taskId = c.req.param('id');
  const task = await db.select().from(tasks).where(eq(tasks.id, Number(taskId)))
  return c.json(task);
});

// Update Task by ID
app.put('/tasks/:id', async (c) => {
  const taskId = c.req.param('id');
  const { title, description, status } = await c.req.json();
  const updatedTask = await db.update(tasks).set({
    title,
    description,
    status,
  }).where(eq(tasks.id, Number(taskId))).returning();
  return c.json(updatedTask);
});

// Delete Task by ID
app.delete('/tasks/:id', async (c) => {
  const taskId = c.req.param('id');
  await db.delete(tasks).where(eq(tasks.id, Number(taskId)))
  return c.json({ message: 'Task deleted successfully' });
});


export default app
