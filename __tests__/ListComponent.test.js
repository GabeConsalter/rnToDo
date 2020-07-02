import React from 'react';
import moment from 'moment';
import { List } from '../src/components';
import { render } from '@testing-library/react-native';
import { Task } from '../src/schemas';

describe('List component', () => {
	const taskOne = new Task({ text: 'Task One' }),
		taskTwo = new Task({
			text: 'Task Two',
			done: true,
			createdAt: moment().subtract(2, 'minutes')
				.toISOString(),
			updatedAt: moment().subtract(2, 'minutes')
				.toISOString()
		}),
		taskThree = new Task({
			text: 'Task Three',
			createdAt: moment().subtract(1, 'day')
				.toISOString(),
			updatedAt: moment().subtract(1, 'day')
				.toISOString()
		}),
		taskFour = new Task({
			text: 'Task Four',
			done: true,
			createdAt: moment().subtract(3, 'hours')
				.toISOString(),
			updatedAt: moment().subtract(3, 'hours')
				.toISOString()
		}),
		taskFive = new Task({
			text: 'Task Five',
			createdAt: moment().subtract(30, 'seconds')
				.toISOString(),
			updatedAt: moment().subtract(30, 'seconds')
				.toISOString()
		});

	it('list must be grouped by undone tasks first and done tasks after', async () => {
		await Task.deleteAll();
		await taskFour.save();
		await taskOne.save();
		await taskTwo.save();
		await taskThree.save();
		await taskFive.save();

		const { getByTestId } = render(<List tasks={await Task.getAll()} />),
			list = getByTestId('list'),
			tasks = list.props.data,
			firstDoneIndex = tasks.findIndex(task => task.done),
			doneTasks = tasks.slice(firstDoneIndex);

		expect(doneTasks.find(task => !task.done)).toBe(undefined);
	});

	it('list must be sorted by most recent updated in each group', async () => {
		const { getByTestId } = render(<List tasks={await Task.getAll()} />),
			list = getByTestId('list'),
			tasks = list.props.data,
			undoneTasks = tasks.filter(task => !task.done),
			doneTasks = tasks.filter(task => task.done);

		if (undoneTasks.length > 1) {
			for (let i = 0; i < undoneTasks.length - 1; i++) {
				if (!undoneTasks[i + 1]) {
					break;
				}

				expect(
					new Date(undoneTasks[i].updatedAt).getTime() - new Date(undoneTasks[i + 1].updatedAt).getTime()
				).toBeGreaterThan(0);
			}
		}

		if (doneTasks.length > 1) {
			for (let i = 0; i < doneTasks.length - 1; i++) {
				if (!doneTasks[i + 1]) {
					break;
				}

				expect(
					new Date(doneTasks[i].updatedAt).getTime() - new Date(doneTasks[i + 1].updatedAt).getTime()
				).toBeGreaterThan(0);
			}
		}
	});
});