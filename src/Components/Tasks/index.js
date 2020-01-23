import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';

import TasksAll from './Tasks/TasksAll';

const Tasks = ({ tasks }) => {
	return (
		<Fragment>
			<Helmet>
				<title>DoTask | Tasks</title>
			</Helmet>
			<Switch>
				<Route path='/tasks/all' render={() => <TasksAll tasks={tasks} />} />
			</Switch>
		</Fragment>
	);
};

export default Tasks;





