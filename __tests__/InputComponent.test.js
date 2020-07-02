import React from 'react';
import Input from '../src/components/Input.js';
import { fireEvent, render } from '@testing-library/react-native';
import { Task } from '../src/schemas';

describe('Input component', () => {
	let task = null;

	const { getByTestId } = render(<Input onSendTask={text => task = new Task({ text })} />),
		textInput = getByTestId('textInput');

	it('should start empty', () => {
		expect(textInput.props.value).toBe('');
	});

	it('should typed "testing"', () => {
		fireEvent.changeText(textInput, 'Test Task');

		expect(textInput.props.value).toBe('Test Task');
	});

	it('should erase text after submit', () => {
		fireEvent.submitEditing(textInput);

		expect(textInput.props.value).toBe('');
	});

	it('should created a new task', () => {
		expect(task).toMatchObject({
			text: 'Test Task'
		});

		task = null;
	});

	it('should not send task when input is empty', () => {
		if (textInput.props.value === '') {
			fireEvent.submitEditing(textInput);

			expect(task).toBe(null);
			expect(textInput.props.placeholder).toBe('Hey, write something!');
		}
	});
});