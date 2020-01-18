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
		const column = this.state.columns[source.droppableId];
		const newTaskIds = Array.from(column.taskIds);
		newTaskIds.splice(source.index, 1);
		newTaskIds.splice(destination.index, 0, draggableId);
		const newColumn = {
			...column,
			taskIds: newTaskIds
		};
		const newState = {
			...this.state,
			columns: {
				...this.state.columns,
				[newColumn.id]: newColumn
			}
		};
		this.setState(newState);
	}

	setCategory = id => this.setState({active: id})
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