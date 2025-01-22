// taskService.ts
import { db } from '../db';
import { tasks } from '../db/schema';
import {eq} from 'drizzle-orm';

export class TaskService {
  // Fetch tasks by userId
  static async getTasksByUserId(userId: number) {
    return db.select().from(tasks).where(eq(tasks.userId, userId));
  }

  // Fetch all tasks
  static async getAllTasks() {
    return db.select().from(tasks);
  }
}
