import React from 'react';
import { List } from '../src/components';
import { render } from '@testing-library/react-native';
import { Task } from '../src/schemas';

describe('List component', () => {
	const taskOne = new Task({ text: 'Task One' }),
		taskTwo = new Task({ text: 'Task Two' }),
		taskThree = new Task({ text: 'Task Three' });

	it('the tasks must be grouped by undone first and done after', async () => {
		await Task.deleteAll();

		taskOne.save();

		taskTwo.done = true;
		taskTwo.save();

		taskThree.save();

		const { getByTestId } = render(<List tasks={await Task.getAll()} />),
			list = getByTestId('list'),
			tasks = list.props.data,
			firstDoneIndex = tasks.findIndex(task => task.done),
			doneTasks = tasks.slice(firstDoneIndex),
			undoneTasks = tasks.slice(0, doneTasks);

		// done group test
		expect(doneTasks.findIndex(task => !task.done)).toBe(-1);
		expect(doneTasks.sort((a, b) => b.date - a.date)).toMath(doneTasks);

		// undone group test
		expect(undoneTasks.findIndex(task => task.done)).toBe(-1);
		expect(undoneTasks.sort((a, b) => b.date - a.date)).toMath(undoneTasks);
	});
});