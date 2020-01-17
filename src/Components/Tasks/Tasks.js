import React from 'react';
import List from '@material-ui/core/List';


import Task from './Task';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing }) => ({
	root: {
		marginTop: spacing(3)
	}
}));

const Tasks = ({ tasks: { columns, active, tasks }, setTasks }) => {
	const classes = useStyles();
	const taskList = columns[active].taskIds.map((id,i) => <Task index={i} key={id} id={id} text={tasks[id].content} />);
	return (
		<List className={classes.root}>
			{taskList}
		</List>
	);
};

export default Tasks;
