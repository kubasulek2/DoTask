import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import TasksAll from './Tasks/All/';
import TasksSearch from './Tasks/Search/';
import TasksFavorite from './Tasks/Favorite/';
import TasksToday from './Tasks/Today/';
import TasksList from './Tasks/List';

const Tasks = props => {
	const { tasks, lists } = props;
	return (
		<Fragment>
			<Helmet>
				<title>DoTask | Tasks</title>
			</Helmet>
			<Switch>
				<Route path='/tasks/all' render={() => <TasksAll {...props} tasks={tasks} lists={lists} />} />
				<Route path='/tasks/search' render={(props) => <TasksSearch {...props} tasks={tasks} />} />
				<Route path='/tasks/favorite' render={() => <TasksFavorite {...props} tasks={tasks} />} />
				<Route path='/tasks/today' render={() => <TasksToday {...props} tasks={tasks} />} />
				<Route path='/tasks/:category' render={(props) => <TasksList {...props} tasks={tasks} lists={lists} />} />
				<Route path='/tasks' exact render={() => <Redirect to='/tasks/all' />} />
			</Switch>
		</Fragment>
	);
};

const mapStateToProps = ({ tasks, }) => ({
	tasks: tasks.tasks,
	lists: tasks.lists,
});

export default connect(mapStateToProps)(Tasks);





