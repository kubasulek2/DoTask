import React from 'react';
import queryString from 'query-string';

import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

import NotFound from '../../UI/NotFound';
import NoDragTask from '../Task/NoDragTask';

const useStyles = makeStyles(({ spacing }) => ({
	root: {
		marginTop: spacing(1),
	}
}));

const Tasks = ({ location: { search }, tasks: { tasks } }) => {
	const classes = useStyles();
	const query = queryString.parse(search).query.toLowerCase();
	let taskList = [];

	Object.values(tasks).forEach(task => task.content.toLowerCase().includes(query) ? taskList.push(<NoDragTask key={task.id} text={task.content} />) : null);
	
	return (
		taskList.length
			? <List className={classes.root}>{taskList}</List>
			: <NotFound />
	);

};

export default Tasks;
