import * as actionTypes from '../Actions/actionTypes';
import { produce } from 'immer';

const initialState = {
	isAuth: false,
	loading: false,
	error: false,
	sortAllowed: false,
	confirm: false,
	activeList: null,
	cb: null,
};

const reducer = (state = initialState, action) => {

	switch (action.type) {
		case actionTypes.HANDLE_AUTH:
			return produce(state, draft => { draft.isAuth = action.auth; });

		case actionTypes.INIT_REQUEST:
			return produce(state, draft => { draft.loading = true; draft.error = false; draft.confirm = false; });

		case actionTypes.INIT_BACKGROUND_REQUEST:
			return produce(state, draft => { draft.error = false; draft.cb = null; });

		case actionTypes.REQUEST_FAILED:
			return produce(state, draft => { draft.loading = false; draft.error = action.error; draft.cb = action.cb; });

		case actionTypes.REQUEST_SUCCESS:
			return produce(state, draft => { draft.loading = false; draft.error = false; draft.cb = null; draft.confirm = false; });

		case actionTypes.ALLOW_SORT:
			return produce(state, draft => { draft.sortAllowed = action.sort; draft.activeList = action.listId; });

		case actionTypes.ASK_TO_CONFIRM:
			return produce(state, draft => { draft.confirm = true; draft.cb = action.cb; });


		default:
			return state;
	}
};

export default reducer;