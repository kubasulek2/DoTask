import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import isLoggedIn from '../../Utils/is_logged_in';
import WithStyles from '../../HOC/WithStyles';
import Layout from '../../Components/Layout';
import Login from '../../Components/Login';
import Loader from '../../Components/UI/Loader/';
import * as actions from '../../Store/Actions';


class App extends Component {

	componentDidMount() {
		const { handleAuth, fetchTasks } = this.props;
		if (isLoggedIn()) {
			handleAuth(true);
		}
		fetchTasks();
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
			//<Loader color='#4fa84a'/>
			<Switch>
				<Route path='/login' component={Login} />
				<Route path='/' render={() => app} />
			</Switch>
		);
	}
}

const mapStateToProps = ({ tasks }) => ({
	lists: tasks.lists
});

const mapDispatchToProps = dispatch => ({
	addTask: (listId, idx, taskId) => dispatch(actions.addTask(listId, taskId, idx)),
	removeTask: (listId, idx) => dispatch(actions.removeTask(listId, idx)),
	changeListsOrder: (sourceIdx, destIdx, taskId) => dispatch(actions.changeListsOrder(sourceIdx, destIdx, taskId)),
	fetchTasks: () => dispatch(actions.fetchTasks()),
	handleAuth: bool => dispatch(actions.handleAuth(bool))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WithStyles(App)));