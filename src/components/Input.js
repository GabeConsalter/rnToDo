import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TextInput } from 'react-native';

const Input = props => (<>
	<TextInput
		style={styles.container}
		placeholder={props.placeholder}
		placeholderTextColor="#FFFFFF77"
	/>
</>);

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