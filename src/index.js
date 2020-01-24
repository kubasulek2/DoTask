import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { get } from 'axios';

import App from './Containers/App';
import reducer from './Store/Reducers';

require('dotenv').config();

get('http://localhost:5000').then(resp => console.log(resp.data));
const store = createStore(reducer);

const app = (
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);
ReactDOM.render(app, document.getElementById('root'));