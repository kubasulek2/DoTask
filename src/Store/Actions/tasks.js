import { get } from 'axios';
import { initRequest, requestFailed, requestSuccess } from './';
import * as actionTypes from './actionTypes';


export const addTask = (listId, taskId, idx) => ({ type: actionTypes.ADD_TASK_TO_LIST, listId, taskId, idx });

export const removeTask = (listId, idx) => ({ type: actionTypes.REMOVE_TASK_FROM_LIST, listId, idx });

export const changeListsOrder = (sourceIdx, destIdx, taskId) => ({ type: actionTypes.CHANGE_LISTS_ORDER, sourceIdx, destIdx, taskId });


const setTasks = data => ({ type: actionTypes.SET_TASKS, data });

export const fetchTasks = () => dispatch => {
	
	dispatch(initRequest());
	get('http://localhost:5000')
		.then(({data}) => {
			dispatch(setTasks(data));
			dispatch(requestSuccess());
		})
		.catch(err => {
			dispatch(requestFailed(err.message));
		});

};