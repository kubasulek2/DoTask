import * as actionTypes from '../Actions/actionTypes';
import produce from 'immer';

import sort from '../../Utils/sort';


const initialState = {
	tasks: {},
	lists: {},
	listsOrder: [],
};

let cList = 3, cTask = 5, dummyListId, dummyTaskId;
const reducer = (state = initialState, action) => {
	// temporary hack: pseudo id	

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
			dummyListId = 'list-' + ++cList;
			return produce(state, draft => {
				draft.lists[dummyListId] = { id: dummyListId, title: action.title, taskIds: [] };
				draft.listsOrder.push(dummyListId);
			});
		case actionTypes.DELETE_LIST:
			return produce(state, draft => {
				for (const task in draft.tasks) {
					if (draft.lists[action.listId].taskIds.includes(task.id)) {
						delete draft.tasks[task.id];
					}
				}
				delete draft.lists[action.listId];
				draft.listsOrder.splice(draft.listsOrder.indexOf(action.listId), 1);
			});

		case actionTypes.SET_TASKS:
			return action.data;
				

		case actionTypes.SET_TASK:
			return produce(state, draft => {
				draft.tasks[action.task.id] = action.task;
			});

	
		case actionTypes.SORT_TASKS:
			const taskArr = [...state.lists[action.listId].taskIds];
			const newTaskArr = sort[action.sortType](taskArr, state.tasks);
			return produce(state, draft => {
				draft.lists[action.listId].taskIds = newTaskArr;
			});

		case actionTypes.CREATE_TASK:
			dummyTaskId = 'task-' + ++cTask;
			return produce(state, draft => {
				draft.tasks[dummyTaskId] = action.task;
				draft.tasks[dummyTaskId].id = dummyTaskId;
				draft.lists[action.listId].taskIds.push(dummyTaskId);
			});

		case actionTypes.CREATE_DEFAULT_TASK:
			dummyTaskId = 'task-' + ++cTask;
			if (!Object.values(state.lists).some(l => l.title === 'default')) {
				dummyListId = 'list-' + ++cList;
				return produce(state, draft => {
					draft.lists = {
						[dummyListId]: { id: dummyListId, title: action.listTitle, taskIds: [] },
						...draft.lists
					};
					draft.listsOrder.unshift(dummyListId);
					draft.tasks[dummyTaskId] = action.task;
					draft.tasks[dummyTaskId].id = dummyTaskId;
					draft.lists[dummyListId].taskIds.push(dummyTaskId);
				});
			}
			return produce(state, draft => {
				draft.tasks[dummyTaskId] = action.task;
				draft.tasks[dummyTaskId].id = dummyTaskId;
				draft.lists[Object.values(draft.lists).find(l => l.title === 'default').id].taskIds.push(dummyTaskId);
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