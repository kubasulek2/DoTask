import * as actionTypes from '../Actions/actionTypes';
import produce from 'immer';

import sort from '../../Utils/sort';


const initialState = {
	tasks: {},
	lists: {},
	listsOrder: [],
};

const reducer = (state = initialState, action) => {

	switch (action.type) {

		case actionTypes.ADD_TASK_TO_LIST:
			return produce(state, draft => {
				draft.lists[action.listId].taskIds.splice(action.idx, 0, action.taskId);
			});

		case actionTypes.REMOVE_TASK_FROM_LIST:
			return produce(state, draft => {
				draft.lists[action.listId].taskIds.splice(action.idx, 1);
			});

		case actionTypes.CHANGE_LISTS_ORDER:
			return produce(state, draft => {
				draft.listsOrder.splice(action.sourceIdx, 1);
				draft.listsOrder.splice(action.destIdx, 0, action.listId);
			});

		case actionTypes.SET_TASKS:
			return action.data;

		case actionTypes.SORT_TASKS:
			const taskArr = [...state.lists[action.listId].taskIds];
			const newTaskArr = sort[action.sortType](taskArr, state.tasks);
			return produce(state, draft => {
				draft.lists[action.listId].taskIds = newTaskArr;
			});

		case actionTypes.DELETE_TASK:
			const list = Object.values(state.lists).find(l => l.taskIds.includes(action.taskId));
			const taskIdx = list.taskIds.indexOf(action.taskId);
			return produce(state, draft => {
				draft.lists[list.id].taskIds.splice(taskIdx,1);
				delete draft.tasks[action.taskId];
			});

		case actionTypes.SET_TASK_FAVORITE:
			return produce(state, draft => {
				draft.tasks[action.taskId].favorite = !draft.tasks[action.taskId].favorite;
			});			

		default:
			return state;
	}
};

export default reducer;