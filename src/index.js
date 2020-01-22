import React from 'react';
import ReactDOM from 'react-dom';


import App from './Containers/App/App';
import { BrowserRouter } from 'react-router-dom';

require('dotenv').config();

const app = (
	<BrowserRouter>
		<App />
	</BrowserRouter>
);
ReactDOM.render(app, document.getElementById('root'));