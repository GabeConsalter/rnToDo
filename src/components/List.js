import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet } from 'react-native';
import { Item } from '.';
import { Task } from '../schemas';

const List = props => {
	const [tasks, setTasks] = useState(props.tasks);

	useEffect(() => {
		setTasks(order(props.tasks));
	}, [props.tasks]);

	function order(tasks) {
		const undoneTasks = tasks.filter(task => !task.done);
		undoneTasks.sort((a, b) => a.updatedAt < b.updatedAt);

		const doneTasks = tasks.filter(task => task.done);
		doneTasks.sort((a, b) => a.updatedAt < b.updatedAt);

		return [...undoneTasks, ...doneTasks];
	}

	return (
		<FlatList
			testID="list"
			style={styles.container}
			data={tasks}
			renderItem={({ item: task }) => (
				<Item
					key={task.guid}
					text={`${task.text}`}
					done={task.done}
					onSetDone={async done => {
						task.done = done;
						task.update();

						console.log(task);

						setTasks(order(await Task.getAll()));
					}}
				/>
			)}
		/>
	);
};

List.propTypes = {
	tasks: PropTypes.array
};

List.defaultProps = {
	tasks: []
};

List.displayName = 'List';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%'
	}
});

export default List;