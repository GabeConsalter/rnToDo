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

		let recentUpdatedAt = undoneTasks.shift().updatedAt;
		undoneTasks.forEach(task => expect(moment(recentUpdatedAt).diff(moment(task.updatedAt))).toBeGreaterThan(0));

		recentUpdatedAt = doneTasks.shift().updatedAt;
		doneTasks.forEach(task => expect(moment(recentUpdatedAt).diff(moment(task.updatedAt))).toBeGreaterThan(0));
	});
});