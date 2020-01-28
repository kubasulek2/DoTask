import * as actionTypes from '../Actions/actionTypes';
import produce from 'immer';

import sort from '../../Utils/sort';


const initialState = {
	tasks: {},
	lists: {},
	listsOrder: [],
};

const reducer = (state = initialState, action) => {
	// temporary hack: pseudo id	
	let c = 3;

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

		case actionTypes.EDIT_LIST:
			return produce(state, draft => {
				draft.lists[action.listId].title = action.title;
			});

		case actionTypes.CREATE_LIST:
			let id = 'list-' + ++c;
			return produce(state, draft => {
				draft.lists[id] = { id, title: action.title, taskIds: [] };
				draft.listsOrder.push(id);
			});
		case actionTypes.DELETE_LIST:
			console.log('here');
			return produce(state, draft => {
				for (const task in draft.tasks) {
					if (draft.lists[action.listId].taskIds.includes(task.id)){ 
						delete draft.tasks[task.id];
					}
				}
				delete draft.lists[action.listId];
				draft.listsOrder.splice(draft.listsOrder.indexOf(action.listId),1);
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
				draft.lists[list.id].taskIds.splice(taskIdx, 1);
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