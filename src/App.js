import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { List } from './components';
import { Task } from './schemas';
import Input from './components/Input';

const App = () => {
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		loadTasks();
	}, []);

	/**
	 * Load saved tasks in database
	 *
	 * @return {Tasks[]} saved tasks
	 *
	 * @author Gabriel Consalter
	 * @since 1.0.0
	 */
	async function loadTasks() {
		setTasks(await Task.getAll());
	}

	/**
	 * Add task to state and save it in database
	 *
	 * @param {string} text - The task description text
	 *
	 * @author Gabriel Consalter
	 * @since 1.0.0
	 */
	function addTask(text) {
		const task = new Task({ text });
		task.save();

		setTasks([...tasks, task]);
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.appTitle}>ToDo</Text>
			</View>
			<List
				tasks={tasks}
				onTaskPress={task => console.log(task)}
			/>
			<Input
				onSendTask={text => addTask(text)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	appTitle: {
		backgroundColor: '#348',
		borderRadius: 7,
		color: '#FFF',
		fontWeight: 'bold',
		marginBottom: 16,
		paddingHorizontal: 8,
		paddingVertical: 2
	},

	container: {
		backgroundColor: '#273251',
		flex: 1,
		padding: 16
	},

	header: {
		alignItems: 'center'
	}
});

export default App;