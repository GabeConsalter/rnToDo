import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { List } from './components';
import { Task } from './schemas';
import Input from './components/Input';

const App = () => {
	const [tasks, setTasks] = useState([]);

	function addTask(text) {
		const task = new Task({ text });

		setTasks([...tasks, task]);
	}

	return (
		<View style={styles.container}>
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
	container: {
		backgroundColor: '#273251',
		flex: 1,
		padding: 16
	}
});

export default App;