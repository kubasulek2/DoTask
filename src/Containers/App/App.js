import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import Column from '../../Components/Column';
import initialData from '../../data';
import styles from './App.module.css';

class App extends Component {
	state = initialData;
	onDragEnd = result => {
		const { destination, source, draggableId } = result;
		if (!destination) return;
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) return;
		const start = this.state.columns[ source.droppableId ];
		const finish = this.state.columns[ destination.droppableId ];

		// moving inside one column
		if (start === finish) {
			const newTaskIds = Array.from(start.taskIds);
			newTaskIds.splice(source.index, 1);
			newTaskIds.splice(destination.index, 0, draggableId);

			const newColumn = {
				...start,
				taskIds: newTaskIds
			};
			const newState = {
				...this.state,
				columns: {
					...this.state.columns,
					[ newColumn.id ]: newColumn
				}
			};
			this.setState(newState);
			return;
		}
		// moving between columns
		const startTaskIds = Array.from(start.taskIds);
		startTaskIds.splice(source.index, 1);
		const newStart = {
			...start,
			taskIds: startTaskIds
		};
		const finishTaskIds = Array.from(finish.taskIds);
		finishTaskIds.splice(destination.index, 0, draggableId);
		const newFinish = {
			...finish,
			taskIds: finishTaskIds
		};
		const newState = {
			...this.state,
			columns: {
				...this.state.columns,
				[ newStart.id ]: newStart,
				[ newFinish.id ]: newFinish,
			}	
		};
		this.setState(newState);
		return;

	};

	onDragUpdate = update => {
		const { destination } = update;
		const opacity = destination ? destination.index / Object.keys(this.state.tasks).length : 0;
		document.body.style.background = `rgba(144, 157, 199, ${ opacity })`;
	};
	render () {
		return (
			<div className={styles.App}>
				<DragDropContext
					onDragEnd={this.onDragEnd}
					onDragUpdate={this.onDragUpdate}
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
