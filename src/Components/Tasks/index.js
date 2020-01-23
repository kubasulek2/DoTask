import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';

import TasksAll from './Tasks/TasksAll';
import TasksSearch from './Tasks/TasksSearch';
import TasksFavorite from './Tasks/TasksFavorite';
import TasksToday from './Tasks/TasksToday';

const Tasks = ({ tasks }) => {
	return (
		<Fragment>
			<Helmet>
				<title>DoTask | Tasks</title>
			</Helmet>
			<Switch>
				<Route path='/tasks/all' render={() => <TasksAll tasks={tasks} />} />
				<Route path='/tasks/search' render={(props) => <TasksSearch {...props} tasks={tasks} />} />
				<Route path='/tasks/favorite' render={() => <TasksFavorite tasks={tasks} />} />
				<Route path='/tasks/today' render={() => <TasksToday tasks={tasks} />} />
			</Switch>
		</Fragment>
	);
};

export default Tasks;





