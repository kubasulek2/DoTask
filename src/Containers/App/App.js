import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import store from 'store';

import isLoggedIn from '../../Utils/is_logged_in';
import WithStyles from '../../HOC/WithStyles';
import Layout from '../../Components/Layout';
import data from '../../Utils/data';
import Login from '../../Components/Login';


class App extends Component {
	state = {
		...data,
		isAuth: false
	}

	componentDidMount() {
		if (isLoggedIn()) {
			this.setState({ isAuth: true });
		}
	}

	onDragEnd = res => {
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
			const newListsOrder = Array.from(this.state.listsOrder);
			newListsOrder.splice(source.index, 1);
			newListsOrder.splice(destination.index, 0, draggableId);
			return this.setState({ listsOrder: newListsOrder });
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
		startTaskIds.splice(source.index, 1);
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
				<Route path='/' render={() => <Layout data={this.state} setCategory={this.setCategory} onDragEnd={this.onDragEnd} logOut={this.logOut} />} />
			</Switch>
		);
	}
}

export default WithStyles(App);