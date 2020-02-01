import React from 'react';
import { Switch, Route } from 'react-router-dom';

import List from './TasksSearch';
import TaskExpand from '../../../../Containers/TaskExpand';

const Routes = props => {

	return (
		<Switch>
			<Route path={'/tasks/search'} exact render={() => <List {...props} />} />
			<Route path={'/tasks/search/editList'} exact render={() => <List {...props} />} />
			<Route path={'/tasks/search/newList'} exact render={() => <List {...props} />} />
			<Route path={'/tasks/search/:taskId'} component={TaskExpand} />
		</Switch>
	);
};

export default Routes;