import * as actionTypes from '../Actions/actionTypes';
import { produce } from 'immer';

const initialState = {
	isAuth: false,
	loading: false,
	error: false,
	sortAllowed: false,
	activeList: null
};

const reducer = (state = initialState, action) => {

	switch (action.type) {
		case actionTypes.HANDLE_AUTH:
			return produce(state, draft => { draft.isAuth = action.auth; });

		case actionTypes.INIT_REQUEST:
			return produce(state, draft => { draft.loading = true; draft.error = false; });

		case actionTypes.REQUEST_FAILED:
			return produce(state, draft => { draft.loading = false; draft.error = action.error; });

		case actionTypes.REQUEST_SUCCESS:
			return produce(state, draft => { draft.loading = false; draft.error = false; });

		case actionTypes.ALLOW_SORT:
			return produce(state, draft => { draft.sortAllowed = action.sort; draft.activeList = action.listId; });

		default:
			return state;
	}
};

export default reducer;