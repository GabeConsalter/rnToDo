import React from 'react';
import { List } from '../src/components';
import { render } from '@testing-library/react-native';
import { Task } from '../src/schemas';

describe('List component', () => {
	const taskOne = new Task({ text: 'Task One' }),
		taskTwo = new Task({ text: 'Task Two', done: true }),
		taskThree = new Task({ text: 'Task Three' }),
		taskFour = new Task({ text: 'Task Four', done: true }),
		taskFive = new Task({ text: 'Task Five' });

	it('list must be grouped by undone tasks first and done tasks after', async () => {
		await Task.deleteAll();

		taskFour.save();
		taskOne.save();
		taskTwo.save();
		taskThree.save();
		taskFive.save();

		const { getByTestId } = render(<List tasks={await Task.getAll()} />),
			list = getByTestId('list'),
			tasks = list.props.data,
			firstDoneIndex = tasks.findIndex(task => task.done),
			doneTasks = tasks.slice(firstDoneIndex);

		expect(doneTasks.find(task => !task.done)).toBe(undefined);
	});
});