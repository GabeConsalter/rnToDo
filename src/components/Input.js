import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const Input = () => (
	<TextInput
		style={styles.container}
		placeholder="What you have to do?"
		placeholderTextColor="#FFFFFF77"
	/>
);

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#374168',
		borderRadius: 7,
		color: '#FFF',
		height: 50,
		paddingHorizontal: 8
	}
});

export default Input;