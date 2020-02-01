import React from 'react';
import { Switch, Route } from 'react-router-dom';

import List from './TasksFavorite';
import TaskExpand from '../../../../Containers/TaskExpand';

const Routes = props => {

	return (
		<Switch>
			<Route path={'/tasks/favorite'} exact render={() => <List {...props} />} />
			<Route path={'/tasks/favorite/editList'} exact render={() => <List {...props} />} />
			<Route path={'/tasks/favorite/newList'} exact render={() => <List {...props} />} />
			<Route path={'/tasks/favorite/:taskId'} component={TaskExpand} />
		</Switch>
	);
};

export default Routes;