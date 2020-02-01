import * as actionTypes from './actionTypes';

export const handleAuth = bool => ({ type: actionTypes.HANDLE_AUTH, auth: bool });
export const initRequest = () => ({ type: actionTypes.INIT_REQUEST });
export const initBgRequest = () => ({ type: actionTypes.INIT_BACKGROUND_REQUEST });
export const requestFailed = (error, cb) => ({ type: actionTypes.REQUEST_FAILED, error, cb });
export const requestSuccess = () => ({ type: actionTypes.REQUEST_SUCCESS });
export const allowSort = (bool, listId) => ({ type: actionTypes.ALLOW_SORT, sort: bool, listId });
export const askToConfirm = cb => ({ type: actionTypes.ASK_TO_CONFIRM, cb });
