import React from 'react';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

import CategoryBadge from '../../UI/CategoryBadge';
import NotFound from '../../UI/NotFound';
import NoDragTask from '../Task/NoDragTask';

const useStyles = makeStyles(({ spacing }) => ({
	root: {
		marginTop: spacing(1),
	}
}));

const Tasks = ({ tasks: { tasks } }) => {
	const classes = useStyles();
	
	return <NotFound />;

};

export default Tasks;
