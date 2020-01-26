import React from 'react';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';

import App from '../Containers/App';
import FourOhFour from '../Components/FourOhFour/';
import Login from '../Components/Login/';
import TasksAll from '../Components/Tasks/Tasks/TasksAll';
import TasksList from '../Components/Tasks/Tasks/TasksList';
import { data } from './data/store';

React.useLayoutEffect = React.useEffect;
Enzyme.configure({ adapter: new EnzymeAdapter() });

const mockStore = configureStore([]);

describe('App routes works correctly', () => {
	let store, app;

	// suppress throwing error message at each test, caused by react-redux update and drag and drop library
	const originalConsoleError = console.error;
	beforeEach(() => {
		console.error = jest.fn((msg) => {
			if (msg.includes('Warning: useLayoutEffect does nothing on the server') || msg.includes('%creact-beautiful-dnd')) {
				return null;
			} else {
				originalConsoleError(msg);
			}
		});
	});

	afterEach(() => {
		console.error = originalConsoleError;
	});

	beforeEach(() => {
		store = mockStore(data);
		store.dispatch = jest.fn();

		app = (
			<Provider store={store}>
				<App />
			</Provider>
		);
	});

	it('should display FourOhFour component for incorrect routes.', () => {
		const wrapper = mount(
			<MemoryRouter initialEntries={['/random']}>
				{app}
			</MemoryRouter>
		);
		expect(wrapper.find(FourOhFour)).toHaveLength(1);
	});

	it('should display FourOhFour component for incorrect routes 2.', () => {
		const wrapper = mount(
			<MemoryRouter initialEntries={['/tasks/alls']}>
				{app}
			</MemoryRouter>
		);
		expect(wrapper.find(FourOhFour)).toHaveLength(1);
	});

	it('should display FourOhFour component when address contains non existing list.', () => {

		const wrapper = mount(
			<MemoryRouter initialEntries={['/tasks/nonExistingTask']}>
				{app}
			</MemoryRouter>
		);

		expect(wrapper.find(FourOhFour)).toHaveLength(1);

	});

	it('should redirect to Login when non authenticated.', () => {
		let noAuth = { 
			...data,
			app: {
				...data.app,
				isAuth: false
			} 
		};
		store = mockStore(noAuth);
		store.dispatch = jest.fn();
		app = (
			<Provider store={store}>
				<App />
			</Provider>
		);

		const wrapper = mount(
			<MemoryRouter initialEntries={['/random']}>
				{app}
			</MemoryRouter>
		);
		const login = wrapper.find(Login);
		expect(wrapper.html()).toEqual(login.html());

	});

	it('should redirect to /list/all. when authenticated', () => {

		const wrapper = mount(
			<MemoryRouter initialEntries={['/']}>
				{app}
			</MemoryRouter>
		);

		expect(wrapper.find(TasksAll)).toHaveLength(1);

	});

	it('should display correct list.', () => {

		const wrapper = mount(
			<MemoryRouter initialEntries={['/tasks/list-1']}>
				{app}
			</MemoryRouter>
		);

		expect(wrapper.find(TasksList)).toHaveLength(1);

	});
});