import React from 'react';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

import NoDragTask from '../Task/NoDragTask';

const useStyles = makeStyles(({ spacing }) => ({
	root: {
		marginTop: spacing(3),
	}
}));

const Tasks = ({ tasks: { tasks } }) => {
	const classes = useStyles();
	const taskList = Object.values(tasks).map(task => <NoDragTask key={task.id} text={task.content} />);

	return (
		<List className={classes.root}>
			{taskList}
		</List>
	);
};

export default Tasks;
