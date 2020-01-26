import * as actionTypes from '../Actions/actionTypes';
import produce from 'immer';


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

		default:
			return state;
	}
};

export default reducer;