import React from 'react';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, render } from 'enzyme';
import { DragDropContext } from 'react-beautiful-dnd';

import TasksAll from '../Components/Tasks/Tasks/TasksAll';
import TasksList from '../Components/Tasks/Tasks/TasksList';
import TasksFavorite from '../Components/Tasks/Tasks/TasksFavorite';
import NoDragTask from '../Components/Tasks/Task/NoDragTask';
import FourOhFour from '../Components/FourOhFour/';
import { data } from './data/store';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const { tasks: { lists, tasks } } = data;

describe('Task Categories display tasks correctly', () => {

	it('should display correct amount of favorite tasks', () => {
		const wrapper = shallow(<TasksFavorite tasks={tasks} />);
		const favorites = Object.values(tasks).filter(t => t.favorite);

		expect(wrapper.find(NoDragTask).length).toBe(favorites.length);
	});

	it('should display correct amount of all tasks', () => {
		const wrapper = shallow(<TasksAll lists={lists} tasks={tasks} />);
		const all = Object.keys(tasks);

		expect(wrapper.find(NoDragTask).length).toBe(all.length);
	});

});

describe('User task lists display tasks correctly.', () => {
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



	it('should display correct amount of specific tasks in user task list..', () => {
		const params = { category: Object.keys(lists)[0] };
		const component = <DragDropContext onDragEnd={() => null}><TasksList lists={lists} tasks={tasks} match={{ params: params }} /></DragDropContext>;
		const wrapper= render(component);
		const userTasks = Object.values(lists)[0].taskIds;
		
		expect(wrapper.find('li.MuiListItem-root')).toHaveLength(userTasks.length);
	});

	it('should not display correct amount of specific task list', () => {
		const wrapper = shallow(<TasksList lists={lists} tasks={tasks} match={{params:{}}} />);

		expect(wrapper.find(FourOhFour).length).toBe(1);
	});

});