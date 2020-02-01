import React from 'react';
import { Switch, Route } from 'react-router-dom';

import List from './TasksAll';
import TaskExpand from '../../../../Containers/TaskExpand';

const Routes = props => {

	return (
		<Switch>
			<Route path={'/tasks/all'} exact render={() => <List {...props} />} />
			<Route path={'/tasks/all/editList'} exact render={() => <List {...props} />} />
			<Route path={'/tasks/all/newList'} exact render={() => <List {...props} />} />
			<Route path={'/tasks/all/:taskId'} component={TaskExpand} />
		</Switch>
	);
};

export default Routes;