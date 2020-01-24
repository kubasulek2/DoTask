import React from 'react';
//import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

// import CategoryBadge from '../../UI/CategoryBadge';
import NotFound from '../../UI/NotFound';
// import NoDragTask from '../Task/NoDragTask';

const useStyles = makeStyles(({ spacing }) => ({
	root: {
		marginTop: spacing(1),
	}
}));

const Tasks = ({ tasks }) => {
	const classes = useStyles();
	console.log(classes,tasks);
	return <NotFound />;

};

export default Tasks;
