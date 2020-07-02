import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TextInput } from 'react-native';

const Input = props => {
	const [text, setText] = useState(''),
		[placeholder, setPlaceholder] = useState(props.placeholder);

	return (<>
		<TextInput
			testID="textInput"
			style={styles.container}
			placeholder={placeholder}
			placeholderTextColor="#FFFFFF77"
			value={text}
			onChangeText={text => setText(text)}
			onSubmitEditing={() => {
				if (text === '') {
					setPlaceholder('Hey, write something!');
					return;
				}

				props.onSendTask(text);

				setText('');
			}}
		/>
	</>);
};

Input.propTypes = {
	onSendTask: PropTypes.func,
	placeholder: PropTypes.string
};

Input.defaultProps = {
	placeholder: 'O que você precisa fazer?'
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