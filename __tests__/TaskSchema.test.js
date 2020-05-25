import { Task } from '../src/schemas';

describe('Task schema', () => {
	const taskOne = new Task({ text: 'Task One' });

	it('should create the task', () => {
		expect(taskOne).toBeInstanceOf(Task);
		expect(taskOne.text).toBe('Task One');
		expect(taskOne.done).toBeFalsy();
	});

	it('should save and get the task', async () => {
		await taskOne.save();

		const savedTask = await Task.get(taskOne.guid);

		expect(savedTask).toMatchObject(taskOne);
	});

	it('should delete all tasks', async () => {
		await Task.deleteAll();

		const tasks = await Task.getAll();

		expect(tasks.length).toBe(0);
	});
});