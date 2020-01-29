import React from 'react';
import {Switch, Route} from 'react-router-dom';

import List from './TasksList';
import FourOhFour from '../../../FourOhFour';
import TaskExpand from '../../../../Containers/TaskExpand';

const TaskList = (props) => {
	const { lists, tasks, match: {params} } = props;
	
	if (!lists[params.category] && Object.keys(tasks).length) return <FourOhFour />;

	return (
		<Switch>
			<Route path={'/tasks/' + params.category + '/:taskId'} component={TaskExpand}/>
			<Route path={'/tasks/' + params.category} exact render={()=> <List {...props}/>}/>
		</Switch>
	);
};

export default TaskList;
