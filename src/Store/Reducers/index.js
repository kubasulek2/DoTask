import * as actionTypes from '../Actions';
import produce from 'immer';


const initialState = {
	tasks: {
		'task-1': { id: 'task-1', content: 'Take out Garbage', favorite: false },
		'task-2': { id: 'task-2', content: 'Watch tv', favorite: true },
		'task-3': { id: 'task-3', content: 'Go out', favorite: true },
		'task-4': { id: 'task-4', content: 'Sleep', favorite: false },
	},
	lists: {
		'list-1': {
			id: 'list-1',
			title: 'Private',
			taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
		},
		'list-2': {
			id: 'list-2',
			title: 'Books',
			taskIds: []
		},
		'list-3': {
			id: 'list-3',
			title: 'shop List',
			taskIds: []
		}
	},
	listsOrder: ['list-1', 'list-2', 'list-3'],
	isAuth: false,
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
				draft.listsOrder.splice(action.destIdx, 0, action.taskId);
			});

		case actionTypes.HANDLE_AUTH:
			return produce(state, draft => { draft.isAuth = action.auth; });

		default:
			return state;
	}
};

export default reducer;