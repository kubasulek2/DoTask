import React from 'react';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import { Route, Redirect } from 'react-router-dom';

import Sidebar from '../Components/Layout/Sidebar/';
import {Layout} from '../Components/Layout/';



Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('Layout displays components correctly', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<Layout auth />);
	});

	it('should render 3 Route components.', () => {
		const component = wrapper.find(Route);
		expect(component).toHaveLength(3);
	});

	it('should render Sidebar component.', () => {
		const component = wrapper.find(Sidebar);
		expect(component).toHaveLength(1);
	});

	it('should render Redirect when isLoggedIn returns false', () => {
		wrapper.setProps({ auth: false });
		const component = wrapper.find(Redirect);
		expect(component).toHaveLength(1);
	});
});
