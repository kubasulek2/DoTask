import { get, post } from 'axios';
import { initRequest, requestFailed, requestSuccess } from './';
import * as actionTypes from './actionTypes';


export const addTask = (listId, taskId, idx) => ({ type: actionTypes.ADD_TASK_TO_LIST, listId, taskId, idx });

export const removeTask = (listId, idx) => ({ type: actionTypes.REMOVE_TASK_FROM_LIST, listId, idx });

export const changeListsOrder = (sourceIdx, destIdx, listId) => ({ type: actionTypes.CHANGE_LISTS_ORDER, sourceIdx, destIdx, listId });


const sortAction = (listId, sortType) => ({ type: actionTypes.SORT_TASKS, sortType, listId });

export const sortTasks = (listId, sortType) => (dispatch, getState) => {
	dispatch(sortAction(listId, sortType));
	
	// Uncomment when api endpoint is ready

	// const sortedList = getState().tasks.lists[listId];
	// dispatch(initRequest());
	// post('http://localhost:5000/tasks', sortedList)
	// 	.then(() => dispatch(requestSuccess()))
	// 	.catch(err => dispatch(requestFailed(err.message, {name: 'sortTasks', args: [listId,sortType]})));
};



const setTasks = data => {
	return { type: actionTypes.SET_TASKS, data };
};

export const fetchTasks = () => dispatch => {


	dispatch(initRequest());
	return get('http://localhost:5000/tasks')
		.then(({ data }) => {
			dispatch(setTasks(data));
			dispatch(requestSuccess());
		})
		.catch(err => {
			dispatch(requestFailed(err.message, { name: 'fetchTasks', args: [] }));
		});

};