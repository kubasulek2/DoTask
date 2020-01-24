import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import store from 'store';

import isLoggedIn from '../../Utils/is_logged_in';
import WithStyles from '../../HOC/WithStyles';
import Layout from '../../Components/Layout';
import data from '../../Utils/data';
import Login from '../../Components/Login';
import * as actionTypes from '../../Store/Actions';


class App extends Component {
	state = {
		...data,
		isAuth: false,
	}

	componentDidMount() {
		if (isLoggedIn()) {
			this.setState({ isAuth: true });
		}
	}

	onDragEnd = res => {
		const { addTask, removeTask, changeListsOrder } = this.props;
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
		const start = this.state.lists[activeId];
		const finish = destination.droppableId === 'inner' ? this.state.lists[activeId] : this.state.lists[destination.droppableId];
		if (start === finish) {
			removeTask(activeId, source.index);
			addTask(activeId, destination.index, draggableId);
			return;
		}

		console.log(finish.id, source.index, activeId);
		removeTask(activeId, source.index);
		addTask(finish.id, finish.taskIds.length, draggableId);
	}

	logIn = persist => {
		if (persist) {
			// token persisting
		}
		store.set('auth', true);
		this.setState({ isAuth: true });
	};

	logOut = () => {
		store.remove('auth');
		this.setState({ isAuth: false });
	};

	render() {
		return (
			<Switch>
				<Route path='/login' render={() => <Login logIn={this.logIn} />} />
				<Route path='/' render={() => <Layout onDragEnd={this.onDragEnd} logOut={this.logOut} />} />
			</Switch>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	addTask: (listId, idx, taskId) => dispatch({ type: actionTypes.ADD_TASK_TO_LIST, listId, taskId, idx }),
	removeTask: (listId, idx) => dispatch({ type: actionTypes.REMOVE_TASK_FROM_LIST, listId, idx }),
	changeListsOrder: (sourceIdx, destIdx, taskId) => dispatch({ type: actionTypes.CHANGE_LISTS_ORDER, sourceIdx, destIdx, taskId })
});

export default connect(null, mapDispatchToProps)(withRouter(WithStyles(App)));