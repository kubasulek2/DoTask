import { get, post } from 'axios';
import { initRequest, requestFailed, requestSuccess, initBgRequest, setInfoToast } from './';
import * as actionTypes from './actionTypes';
import bell from '../../Assets/bell.mp3';
import rustle from '../../Assets/rustle.mp3';
import bubble from '../../Assets/bubble.mp3';

const bellSound = new Audio(bell);
const rustleSound = new Audio(rustle);
const bubbleSound = new Audio(bubble);

const sortAction = (listId, sortType) => ({ type: actionTypes.SORT_TASKS, sortType, listId });
const setTasks = data => ({ type: actionTypes.SET_TASKS, data });
const setTask = task => ({ type: actionTypes.SET_TASK, task });
const createLocalTask = (task, listId) => ({ type: actionTypes.CREATE_TASK, task, listId });
const createDefaultTask = (task, listTitle) => ({ type: actionTypes.CREATE_DEFAULT_TASK, task, listTitle });


export const addTask = (listId, taskId, idx) => dispatch => {
	rustleSound.pause();
	rustleSound.currentTime = 0;
	rustleSound.play();
	dispatch({ type: actionTypes.ADD_TASK_TO_LIST, listId, taskId, idx });
};

export const removeTask = (listId, idx) => ({ type: actionTypes.REMOVE_TASK_FROM_LIST, listId, idx });

export const changeListsOrder = (sourceIdx, destIdx, listId) => dispatch => {
	rustleSound.pause();
	rustleSound.currentTime = 0;
	rustleSound.play();
	dispatch({ type: actionTypes.CHANGE_LISTS_ORDER, sourceIdx, destIdx, listId });
};

export const setTaskFavorite = taskId => ({ type: actionTypes.SET_TASK_FAVORITE, taskId });

export const editList = (title, listId) => ({ type: actionTypes.EDIT_LIST, title, listId });

export const createList = title => dispatch => {
	dispatch(initRequest());
	return get('http://localhost:5000/tasks')
		.then(() => {
			bubbleSound.pause();
			bubbleSound.currentTime = 0;
			bubbleSound.play();
			dispatch({ type: actionTypes.CREATE_LIST, title });
			dispatch(requestSuccess());
			dispatch(setInfoToast('List created'));
		})
		.catch(err => {
			dispatch(requestFailed(err.message, { name: 'createList', args: [title] }));
		});
};

export const deleteList = listId => (dispatch, getState) => {
	dispatch(initRequest());
	return get('http://localhost:5000/tasks')
		.then(() => {
			bellSound.pause();
			bellSound.currentTime = 0;
			bellSound.play();
			dispatch({ type: actionTypes.DELETE_LIST, listId });
			dispatch(requestSuccess());
			dispatch(setInfoToast('List deleted'));
		})
		.catch(err => {
			const cbArgs = getState().app.cb.args;
			dispatch(requestFailed(err.message, { name: 'deleteList', args: [cbArgs] }));
		});
};

export const createTask = (task, listId) => dispatch => {
	dispatch(initRequest());
	if (listId === 'default') {
		return get('http://localhost:5000/tasks')
			.then(() => {
				bubbleSound.pause();
				bubbleSound.currentTime = 0;
				bubbleSound.play();
				dispatch(createDefaultTask(task, listId));
				dispatch(requestSuccess());
				dispatch(setInfoToast('Task created'));
			})
			.catch(err => {
				dispatch(requestFailed(err.message, { name: 'createTask', args: [task, listId] }));
			});
	}

	return get('http://localhost:5000/tasks')
		.then(() => {
			bubbleSound.pause();
			bubbleSound.currentTime = 0;
			bubbleSound.play();
			dispatch(createLocalTask(task, listId));
			dispatch(requestSuccess());
			dispatch(setInfoToast('Task created'));
		})
		.catch(err => {
			dispatch(requestFailed(err.message, { name: 'createTask', args: [task, listId] }));
		});
};

export const deleteTask = taskId => dispatch => {
	bellSound.pause();
	bellSound.currentTime = 0;
	bellSound.play();
	setTimeout(() => {
		dispatch({ type: actionTypes.DELETE_TASK, taskId });
		dispatch(setInfoToast('Task deleted'));
	}, 400);
};

export const sortTasks = (listId, sortType) => (dispatch, getState) => {
	dispatch(sortAction(listId, sortType));

	// Uncomment when api endpoint is ready

	// 	const sortedList = getState().tasks.lists[listId];
	// 	dispatch(initBgRequest());

	// 	post('http://localhost:5000/tasks', sortedList)
	// 		.then(() => dispatch(requestSuccess()))
	// 		.catch(err => dispatch(requestFailed(err.message, {name: 'sortTasks', args: [listId,sortType]})));
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

export const modifyTask = task => dispatch => {
	dispatch(initRequest());
	return get('http://localhost:5000/tasks')
		.then(() => {
			dispatch(setTask(task));
			dispatch(requestSuccess());
		})
		.catch(err => {
			dispatch(requestFailed(err.message, { name: 'modifyTask', args: [task] }));
		});
};
