import React from 'react';
import List from '@material-ui/core/List';

import Task from './Task';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({spacing}) => ({
	root: {
		marginTop: spacing(3)
	}
}));

const Tasks = () => {
	const classes = useStyles();
	return (
		<List className={classes.root}>
			<Task text='first' />			
			<Task text='second' />			
			<Task text='third' />			
		</List>
	);
};

export default Tasks;
