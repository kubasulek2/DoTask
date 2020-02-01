import React from 'react';
import { Switch, Route } from 'react-router-dom';

import List from './TasksToday';
import TaskExpand from '../../../../Containers/TaskExpand';

const Routes = props => {

	return (
		<Switch>
			<Route path={'/tasks/today'} exact render={() => <List {...props} />} />
			<Route path={'/tasks/today/editList'} exact render={() => <List {...props} />} />
			<Route path={'/tasks/today/newList'} exact render={() => <List {...props} />} />
			<Route path={'/tasks/today/:taskId'} component={TaskExpand} />
		</Switch>
	);
};

export default Routes;