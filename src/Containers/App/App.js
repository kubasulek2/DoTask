import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import Column from '../../Components/Column';
import initialData from '../../data';
import styles from './App.module.css';

class App extends Component {
	state = initialData;
	onDragEnd = result => {
		return result;
	}
	render () {
		return (
			<div className={styles.App}>
				<DragDropContext
					onDragEnd={this.onDragEnd}
				>
					{this.state.columnOrder.map(columnId => {
						const column = this.state.columns[ columnId ];
						const tasks = column.taskIds.map(taskId => this.state.tasks[ taskId ]);

						return <Column key={column.id} column={column} tasks={tasks} />;
					})}
				</DragDropContext>
			</div>
		);
	}
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
