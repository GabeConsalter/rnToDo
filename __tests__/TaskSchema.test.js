import { Task } from '../src/schemas';

describe('Task schema', () => {
	const task = new Task({ text: 'Test Task' });

	it('should create the task', () => {
		expect(task).toBeInstanceOf(Task);
		expect(task.text).toBe('Test Task');
		expect(task.done).toBeFalsy();
	});

	it('should save and get the task', async () => {
		await task.save();

		const savedTask = await Task.get(task.guid);

		expect(savedTask).toMatchObject(task);
	});
});