import * as actionTypes from './actionTypes';

export const handleAuth = bool => ({ type: actionTypes.HANDLE_AUTH, auth: bool });