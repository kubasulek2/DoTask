import React from 'react';

import styles from './App.module.css';

function App () {
	return (
		<div className={styles.App}>
			<ul className={styles.List}>
				<li className={styles.ListItem}>item1</li>
				<li className={styles.ListItem}>item2</li>
				<li className={styles.ListItem}>item3</li>
				<li className={styles.ListItem}>item4</li>
				<li className={styles.ListItem}>item5</li>
			</ul>
			<ul>
				<li className={styles.ListItem}>item6</li>
				<li className={styles.ListItem}>item7</li>
				<li className={styles.ListItem}>item8</li>
				<li className={styles.ListItem}>item9</li>
				<li className={styles.ListItem}>item10</li>
			</ul>
		</div>
	);
}

export default App;

/* manifest.json update when will have an icon */
//   "icons": [
//     {
//       "src": "favicon.ico",
//       "sizes": "64x64 32x32 24x24 16x16",
//       "type": "image/x-icon"
//     },
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
