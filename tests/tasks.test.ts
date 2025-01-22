// tests/tasks.test.ts
import sinon from 'sinon';
import { TaskService } from '../src/services/tasks';
import app from '../src';

describe('Tasks API with Sinon Stubs', () => {
  afterEach(() => {
    sinon.restore(); // Reset all stubs after each test
  });

  it('should return tasks for a given user', async () => {
    const stub = sinon.stub(TaskService, 'getTasksByUserId').resolves([
      { id: 1, title: 'Test Task', description: 'This is a test', userId: 1, status: 'pending' },
    ]);

    const response = await app.request('/tasks?userId=1');

    const data = await response.json();

    console.log('data', data)

    console.log('response', response);

    expect(response.status).toBe(200);
    expect(data).toEqual([
      { id: 1, title: 'Test Task', description: 'This is a test', userId: 1, status: 'pending' },
    ]);

    sinon.assert.calledOnce(stub);
    sinon.assert.calledWith(stub, 1); // Check that the method was called with userId = 1
  });

  it('should return all tasks when no userId is provided', async () => {
    const stub = sinon.stub(TaskService, 'getAllTasks').resolves([
      { id: 1, title: 'Test Task', description: 'This is a test', userId: 1 , status: 'pending'},
      { id: 2, title: 'Another Task', description: 'Another test', userId: 2 , status: 'pending'},
    ]);

    const response = await app.request('/tasks');
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual([
      { id: 1, title: 'Test Task', description: 'This is a test', userId: 1 , status: 'pending'},
      { id: 2, title: 'Another Task', description: 'Another test', userId: 2 , status: 'pending'},
    ]);

    sinon.assert.calledOnce(stub);
  });
});
