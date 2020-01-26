import * as actionTypes from './actionTypes';

export const handleAuth = bool => ({ type: actionTypes.HANDLE_AUTH, auth: bool });
export const initRequest = () => ({ type: actionTypes.INIT_REQUEST });
export const requestFailed = error => ({ type: actionTypes.REQUEST_FAILED, error });
export const requestSuccess = () => ({ type: actionTypes.REQUEST_SUCCESS });
export const allowSort = bool => ({ type: actionTypes.ALLOW_SORT, sort: bool });
