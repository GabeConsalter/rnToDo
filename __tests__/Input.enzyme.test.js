import React from 'react';
import { mount } from 'enzyme';
import { Input } from '../src/components';

describe('rendering', () => {
	let wrapper;

	beforeEach(() => wrapper = mount(<Input />));

	it('should render a <TextInput />', () => {
		expect(wrapper.find('TextInput')).toHaveLength(1);
	});
});