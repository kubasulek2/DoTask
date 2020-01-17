import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListIcon from '@material-ui/icons/List';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles(({ spacing, palette }) => ({
	root: {
		paddingTop: spacing(2.5),
		flexGrow: 1,
		paddingBottom: 64
	},
	listItem: {
		padding: spacing(.5)
	},
	icon: {
		color: palette.grey[400],
		marginLeft: 12,
		minWidth: 40,

	},
	badge: {
		marginLeft: 6,
		fontSize: 12,
		color: palette.grey[500],
		fontWeight: 'bold',
	},
	secondary: {
		width: 140
	},
	secondary_edit: {
		width: 120

	},
	editIcon: {
		color: palette.error.light
	}
}));

const TasksLists = () => {
	const classes = useStyles();

	return (
		<List className={classes.root}>
			{['private', 'Shopping', 'Read'].map((t, i) => {
				let active = i === 1 ? true : false;
				return (
					<ListItem key={t + i} className={classes.listItem} button selected={active}>
						<ListItemIcon className={classes.icon}>
							<ListIcon />
						</ListItemIcon>
						<ListItemText
							secondary={t}
							classes={{ secondary: active ? classes.secondary_edit : classes.secondary }} 
							primaryTypographyProps={{
								noWrap: true,
								component: 'p'
							}}	
						/>
						<ListItemSecondaryAction>
							{active ? <IconButton size='small' className={classes.editIcon}><EditIcon /></IconButton> : null}
							<span className={classes.badge}>6</span>
						</ListItemSecondaryAction>
					</ListItem>
				);
			})}
		</List>
	);
}

export default TasksLists;
