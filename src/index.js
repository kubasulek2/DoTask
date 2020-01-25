import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { get } from 'axios';

import App from './Containers/App';
import tasksReducer from './Store/Reducers/tasks';
import authReducer from './Store/Reducers/auth';

require('dotenv').config();

get('http://localhost:5000').then(resp => console.log(resp.data));

const rootReducer = combineReducers({
	tasks: tasksReducer,
	auth: authReducer
}) 
const store = createStore(rootReducer);

const app = (
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);
ReactDOM.render(app, document.getElementById('root'));