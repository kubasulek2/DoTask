import * as actionTypes from '../Store/Actions/actionTypes';
import appReducer from '../Store/Reducers/app';
import tasksReducer from '../Store/Reducers/tasks';
import { data } from './data/store';



describe('App reducer', () => {

	it('should return initial state by default', () => {
		expect(appReducer(undefined, { type: undefined })).toEqual({
			isAuth: false,
			loading: false,
			error: false
		});
	});

	it('should handle init request.', () => {
		expect(appReducer(undefined, { type: actionTypes.INIT_REQUEST })).toEqual({
			loading: true,
			error: false,
			isAuth: false
		});
	});

	it('should handle auth.', () => {
		expect(appReducer(undefined, { type: actionTypes.HANDLE_AUTH, auth: true })).toEqual({
			loading: false,
			error: false,
			isAuth: true
		});
	});

	it('should handle request failed.', () => {
		expect(appReducer(undefined, { type: actionTypes.REQUEST_FAILED, error: 'error' })).toEqual({
			loading: false,
			error: 'error',
			isAuth: false
		});
	});

	it('should handle request success.', () => {
		expect(appReducer(undefined, { type: actionTypes.REQUEST_SUCCESS })).toEqual({
			loading: false,
			error: false,
			isAuth: false
		});
	});

});

describe('Tasks reducer', () => {
	let state, listId = Object.values(data.tasks.lists)[0].id;

	beforeEach(() => {
		state = JSON.parse(JSON.stringify(data.tasks));
	});


	it('should return initial state by default', () => {
		expect(tasksReducer(undefined, { type: undefined })).toEqual({
			lists: {},
			tasks: {},
			listsOrder: []
		});
	});

	it('should handle populate state with data ', () => {
		expect(tasksReducer(state, { type: actionTypes.SET_TASKS, data: state })).toEqual(state);
	});

	it('should handle adding task to list.', () => {
		let taskId = 'newTask', idx = 2,
			newState = tasksReducer(state, { type: actionTypes.ADD_TASK_TO_LIST, taskId, listId, idx });

		expect(newState.lists[listId].taskIds.length).toEqual(state.lists[listId].taskIds.length + 1);
		expect(newState.lists[listId].taskIds[idx]).toEqual(taskId);
	});

	it('should handle adding task to list.', () => {
		let idx = 0,
			newState = tasksReducer(state, { type: actionTypes.REMOVE_TASK_FROM_LIST, listId, idx });

		expect(newState.lists[listId].taskIds.length).toEqual(state.lists[listId].taskIds.length - 1);
		expect(newState.lists[listId].taskIds[idx]).not.toEqual(state.lists[listId].taskIds[idx]);
	});

	it('should handle reordering lists.', () => {
		let sourceIdx = 0, destIdx = 2,
			newState = tasksReducer(state, { type: actionTypes.CHANGE_LISTS_ORDER, listId, sourceIdx, destIdx });

		expect(newState.listsOrder[sourceIdx]).not.toEqual(listId);
		expect(newState.listsOrder[destIdx]).toEqual(listId);
	});
});