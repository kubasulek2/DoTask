import * as actionTypes from './actionTypes';


export const addTask = (listId, taskId, idx) => ({ type: actionTypes.ADD_TASK_TO_LIST, listId, taskId, idx });

export const removeTask = (listId, idx) => ({ type: actionTypes.REMOVE_TASK_FROM_LIST, listId, idx });

export const changeListsOrder = (sourceIdx, destIdx, taskId) => ({ type: actionTypes.CHANGE_LISTS_ORDER, sourceIdx, destIdx, taskId });