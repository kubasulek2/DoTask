import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import isLoggedIn from '../../Utils/is_logged_in';
import WithStyles from '../../HOC/WithStyles';
import Layout from '../../Components/Layout';
import Login from '../../Components/Login';
import * as actionTypes from '../../Store/Actions';


class App extends Component {

	componentDidMount() {
		const { handleAuth } = this.props;
		if (isLoggedIn()) {
			handleAuth(true);
		}
	}

	onDragEnd = res => {
		const { addTask, removeTask, changeListsOrder, lists } = this.props;
		const { destination, source, draggableId, type } = res;
		if (!destination) {
			return;
		}
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}


		if (type === 'list') {
			return changeListsOrder(source.index, destination.index, draggableId);
		}

		const activeId = this.props.location.pathname.match(/(?<=tasks\/)(?:.+(?=[/?])|.+(?=$))/)[0];
		const start = lists[activeId];
		const finish = destination.droppableId === 'inner' ? lists[activeId] : lists[destination.droppableId];
		if (start === finish) {
			removeTask(activeId, source.index);
			addTask(activeId, destination.index, draggableId);
			return;
		}

		removeTask(activeId, source.index);
		addTask(finish.id, finish.taskIds.length, draggableId);
	}

	render() {
		const app = (
			<DragDropContext onDragEnd={this.onDragEnd}>
				<Layout />
			</DragDropContext>
		);

		return (
			<Switch>
				<Route path='/login' component={Login} />
				<Route path='/' render={() => app} />
			</Switch>
		);
	}
}

const mapStateToProps = ({lists}) => ({
	lists
}); 

const mapDispatchToProps = dispatch => ({
	addTask: (listId, idx, taskId) => dispatch({ type: actionTypes.ADD_TASK_TO_LIST, listId, taskId, idx }),
	removeTask: (listId, idx) => dispatch({ type: actionTypes.REMOVE_TASK_FROM_LIST, listId, idx }),
	changeListsOrder: (sourceIdx, destIdx, taskId) => dispatch({ type: actionTypes.CHANGE_LISTS_ORDER, sourceIdx, destIdx, taskId }),
	handleAuth: bool => dispatch({ type: actionTypes.HANDLE_AUTH, auth: bool })
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WithStyles(App)));