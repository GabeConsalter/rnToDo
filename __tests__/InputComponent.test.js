import React from 'react';
import Input from '../src/components/Input.js';
import { fireEvent, render } from '@testing-library/react-native';

describe('Input component', () => {
	const { getByTestId } = render(<Input />),
		textInput = getByTestId('textInput');

	it('should start empty', () => {
		expect(textInput.props.value).toBe('');
	});

	it('should typed "testing"', () => {
		fireEvent.changeText(textInput, 'testing');

		expect(textInput.props.value).toBe('testing');
	});

	it('should erase text after submit', () => {
		fireEvent.submitEditing(textInput);

		expect(textInput.props.value).toBe('');
	});
});