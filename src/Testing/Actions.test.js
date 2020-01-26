import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { fetchTasks, addTask } from '../Store/Actions/';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({});

describe('Async actions', () => {

	it('should ', () => {
		const action = [
			{ type: 'INIT_REQUEST' },
			{ type: 'SET_TASKS', data: 'mock' }, { type: 'REQUEST_SUCCESS' }
		];
		store.dispatch(fetchTasks()).then(() => expect(store.getActions()).toEqual(action));
	});
});

describe('Sync actions', () => {

	it('should ', () => {
		let listId = 'list-1', taskId = 'task-1', idx = 0;
		const action = { type: 'ADD_TASK_TO_LIST', listId, taskId, idx};
		expect(store.dispatch(addTask(listId, taskId, idx))).toEqual(action);

	});
});

