import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListIcon from '@material-ui/icons/List';

const useStyles = makeStyles(({ spacing }) => ({
	root: {
		paddingTop: spacing(2.5),
		flexGrow: 1,
		paddingBottom: 64
	},
	listItem: {
		padding: spacing(.5)
	},
}));

const TasksLists = () => {
	const classes = useStyles();

	return (
		<List className={classes.root}>
			{['private', 'Shopping', 'Read', 'private', 'Shopping', 'Read', 'private', 'Shopping', 'Read', 'private', 'Shopping', 'Read', 'private', 'Shopping', 'Read', 'private', 'Shopping', 'Read', 'private', 'Shopping', 'Read', 'private', 'Shopping', 'Read'].map((t, i) => (
				<ListItem key={t+i} className={classes.listItem} button>
					<ListItemIcon>
						<ListIcon />
					</ListItemIcon>
					<ListItemText primary={t}/>
				</ListItem>
			))}
		</List>
	);
}

export default TasksLists;
