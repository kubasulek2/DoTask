import React from 'react';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

import FourOhFour from '../../FourOhFour';
import NoDragTask from '../Task/NoDragTask';

const useStyles = makeStyles(({ spacing }) => ({
	root: {
		marginTop: spacing(1),
	}
}));

const Tasks = ({ tasks: { tasks } }) => {
	const classes = useStyles();
	
	return <FourOhFour />;

};

export default Tasks;
