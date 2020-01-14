import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './Containers/App/App';

require('dotenv').config();


ReactDOM.render(<App />, document.getElementById('root'));

/* manifest.json update when will have an icon */
//   
//     {
//       "src": "logo192.png",
//       "type": "image/png",
//       "sizes": "192x192"
//     },
//     {
//       "src": "logo512.png",
//       "type": "image/png",
//       "sizes": "512x512"
//     }
//   ],
