import React from 'react';
import { Item } from '../src/components';
import { render } from '@testing-library/react-native';

describe('Item component', () => {
	const { getByTestId } = render(
			<Item
				text="Test Task"
				done={false}
			/>
		),
		btnStatus = getByTestId('btnStatus');

	it('should switch done status', () => {
		console.log(btnStatus);
	});
});