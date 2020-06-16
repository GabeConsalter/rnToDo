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
			firstDone = tasks.findIndex(task => task.done);

		expect(tasks.slice(firstDone).findIndex(task => !task.done)).toBe(-1);
	});
});