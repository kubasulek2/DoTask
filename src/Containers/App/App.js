import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import WithStyles from '../../HOC/WithStyles';
import Layout from '../../Components/Layout';


class App extends Component {
	state = {}
	onDragEnd = result => {}

	render() {
		return (
			<DragDropContext
				onDragEnd={this.onDragEnd}
			>
				<Layout />
			</DragDropContext>
		);
	}
}

export default WithStyles(App);