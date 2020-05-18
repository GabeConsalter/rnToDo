import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TextInput } from 'react-native';

const Input = props => {
	const [text, setText] = useState('');

	return (<>
		<TextInput
			testID="textInput"
			style={styles.container}
			placeholder={props.placeholder}
			placeholderTextColor="#FFFFFF77"
			value={text}
			onChangeText={text => setText(text)}
		/>
	</>);
};

Input.propTypes = {
	placeholder: PropTypes.string
};

Input.defaultProps = {
	placeholder: 'What do you have ToDo?'
};

Input.displayName = 'Input';

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