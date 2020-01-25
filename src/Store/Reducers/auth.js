import * as actionTypes from '../Actions/actionTypes';
import { produce } from 'immer';

const initialState = {
	isAuth: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {

		case actionTypes.HANDLE_AUTH:
			return produce(state, draft => { draft.isAuth = action.auth; });

		default:
			return state;
	}
};

export default reducer;