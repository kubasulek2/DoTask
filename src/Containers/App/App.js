import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import WithStyles from '../../HOC/WithStyles';
import Layout from '../../Components/Layout';
import data from '../../Utils/data';


class App extends Component {
	state = data
	
	onDragEnd = res => {
		const { destination, source, draggableId } = res;
		if (!destination) {
			return;
		}
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		
		const start = this.state.lists[this.state.active];
		const finish = destination.droppableId === 'inner' ? this.state.lists[this.state.active] : this.state.lists[destination.droppableId];
		if (start === finish) {
			const newTaskIds = Array.from(start.taskIds);
			newTaskIds.splice(source.index, 1);
			newTaskIds.splice(destination.index, 0, draggableId);
			const newList = {
				...start,
				taskIds: newTaskIds
			};
			const newState = {
				...this.state,
				lists: {
					...this.state.lists,
					[newList.id]: newList
				}
			};
			return this.setState(newState); 
		} 
		const startTaskIds = Array.from(start.taskIds);
		startTaskIds.splice(source.index,1);
		const newStart = {
			...start,
			taskIds: startTaskIds
		};

		const finishTaskIds = Array.from(finish.taskIds);
		finishTaskIds.push(draggableId);
		const newFinish = {
			...finish,
			taskIds: finishTaskIds
		};

		const newState = {
			...this.state,
			lists: {
				...this.state.lists,
				[newStart.id]: newStart,
				[newFinish.id]: newFinish,
			}
		};
		return this.setState(newState);
		
	}

	setCategory = id => this.setState({ active: id })

	render() {
		return (
			<DragDropContext
				onDragEnd={this.onDragEnd}
			>
				<Layout data={this.state} setCategory={this.setCategory} />
			</DragDropContext>
		);
	}
}

export default WithStyles(App);