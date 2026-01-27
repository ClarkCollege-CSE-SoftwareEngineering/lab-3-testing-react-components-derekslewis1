import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchTasks, createTask, deleteTask, toggleTask } from '../api/taskApi';

describe('taskApi', () => {
  // Store the original fetch
  const originalFetch = global.fetch;

  beforeEach(() => {
    // Reset fetch mock before each test
    global.fetch = vi.fn();
  });

  afterEach(() => {
    // Restore original fetch after tests
    global.fetch = originalFetch;
  });

  describe('fetchTasks', () => {
    it('returns tasks on successful response', async () => {
      const mockTasks = [
        { id: '1', title: 'Task 1', completed: false },
        { id: '2', title: 'Task 2', completed: true },
      ];

      vi.mocked(global.fetch).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockTasks),
      } as Response);

      const result = await fetchTasks();

      expect(result).toEqual(mockTasks);
      expect(global.fetch).toHaveBeenCalledWith('/api/tasks');
    });

    it('throws error on failed response', async () => {
      vi.mocked(global.fetch).mockResolvedValue({
        ok: false,
        status: 500,
      } as Response);

      await expect(fetchTasks()).rejects.toThrow('Failed to fetch tasks');
    });
  });

  // TODO: Add tests for createTask
  // - Test successful creation (mock POST request, verify body and headers)
  // - Test error handling

  // createTask test for creation and error handling

  describe('createTask', () => {
    it('successfully creates tasks', async () => {
      const newTask = { id: '67', title: 'New Task', completed: false };
      const taskData = { title: 'New Task' };
	
      // mock the fetch
      vi.mocked(global.fetch).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(newTask),
      } as Response);
	
      // call the function createTask
      const result = await createTask(taskData);
	
      // verify result
      expect(result).toEqual(newTask);
      expect(global.fetch).toHaveBeenCalledWith('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      });
    });

    it('throws error on failed response', async () => {
      const taskData = { title: 'New Task' };

      vi.mocked(global.fetch).mockResolvedValue({
        ok: false,
        status: 500,
      } as Response);

      await expect(createTask(taskData)).rejects.toThrow('Failed to create task');
    });
  })

  // TODO: Add tests for deleteTask
  // - Test successful deletion (mock DELETE request)
  // - Test error handling
  
  // deleteTask test for successful deletion and error handling
  describe('deleteTask', () => {
    it('successfully deletes a task', async () => {
	const taskId = 'task-676';
	
	// mock the fetch
	vi.mocked(global.fetch).mockResolvedValue({
		ok: true,
		
	} as Response);
	
	// call the function deleteTask
	await deleteTask(taskId);
	
	// verify
	expect(global.fetch).toHaveBeenCalledWith(`/api/tasks/${taskId}`, {
		method: 'DELETE',
	});
    });
	
    it('throws error on failed response', async () => {

	const taskId = 'task-677';

	vi.mocked(global.fetch).mockResolvedValue({
	
		ok: false,
		status: 500,
	} as Response);
	await expect(deleteTask(taskId)).rejects.toThrow('Failed to delete task');
    });

  });


  // TODO: Add tests for toggleTask
  // - Test successful toggle (mock PATCH request, verify body)
  // - Test error handling
  

  // test for toggleTask successfull toggle and error handling 
  
 describe('toggleTask', () => {
    it('successfully toggles task completion', async () => {
      const updatedTask = { id: '1', title: 'Test Task', completed: true };
	
      // mock the fetch
      vi.mocked(global.fetch).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(updatedTask),
      } as Response);
	
      // call the toggleTask function
      const result = await toggleTask('1', true);
	
      // verify 
      expect(result).toEqual(updatedTask);
      expect(global.fetch).toHaveBeenCalled();
    });

    it('throws error on failed response', async () => {
      vi.mocked(global.fetch).mockResolvedValue({
        ok: false,
      } as Response);

      await expect(toggleTask('1', false)).rejects.toThrow('Failed to update task');
    });
  });
});
