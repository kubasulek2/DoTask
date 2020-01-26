import React from 'react';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import { Route, Switch } from 'react-router-dom';
import Error from '../Components/UI/ErrorModal';
import Loader from '../Components/UI/Loader';
import { App } from '../Containers/App';


Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('App Displays components correctly if authenticated', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<App fetchTasks={() => { }} isAuth />);
	});

	it('should render 2 Route components.', () => {
		const component = wrapper.find(Route);
		expect(component).toHaveLength(2);
	});

	it('should render 1 Switch component.', () => {
		const component = wrapper.find(Switch);
		expect(component).toHaveLength(1);
	});

	it('should render Error component when error is set', () => {
		wrapper.setProps({error: true});
		const component = wrapper.find(Error);
		expect(component).toHaveLength(1);
	});

	it('should render Error component when error is set', () => {
		wrapper.setProps({ loading: true });
		const component = wrapper.find(Loader);
		expect(component).toHaveLength(1);
	});


});

describe('App is guarded if not authenticated.', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<App fetchTasks={() => { }} />);
	});

	it('should render two Route components.', () => {
		const component = wrapper.find(Route);
		expect(component).toHaveLength(2);
	});
	

});


