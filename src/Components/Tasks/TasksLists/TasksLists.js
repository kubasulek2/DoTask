import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListIcon from '@material-ui/icons/List';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { Droppable } from 'react-beautiful-dnd';

const useStyles = makeStyles(({ spacing, palette }) => ({
	root: {
		paddingTop: spacing(2.5),
		flexGrow: 1,
		paddingBottom: 64,
	},
	listItem: {
		padding: spacing(.5),
		minHeight: 36
	},
	over: {
		background: palette.secondary.light + '!important'
	},
	icon: {
		color: palette.grey[400],
		marginLeft: 12,
		minWidth: 40,
		transition: 'all .2s ease',
		'&:hover': {
			color: palette.primary.light
		}

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

const TasksLists = ({ tasks: { lists, listsOrder, active }, setCategory }) => {
	const classes = useStyles();
	return (
		<List className={classes.root}>
			{listsOrder.map((list, i) => (
				<Droppable droppableId={list} key={list + i}>
					{({ droppableProps, innerRef, placeholder }, snapshot) => (
						<ListItem
							ref={innerRef}
							{...droppableProps}
							className={[classes.listItem, snapshot.isDraggingOver ? classes.over : null].join(' ')}
							button
							selected={list === active}
							onClick={() => setCategory(list)}
						>
							<ListItemIcon className={classes.icon}>
								<ListIcon />
							</ListItemIcon>
							<ListItemText
								secondary={lists[list].title}
								classes={{ secondary: active ? classes.secondary_edit : classes.secondary }}
								primaryTypographyProps={{
									noWrap: true,
									component: 'p'
								}}
							/>
							{placeholder}
							<ListItemSecondaryAction>
								{list === active ? <IconButton size='small' className={classes.editIcon}><EditIcon /></IconButton> : null}
								<span className={classes.badge}>6</span>
							</ListItemSecondaryAction>
						</ListItem>
					)}
				</Droppable>
			)
			)}
		</List>
	);
};
export default TasksLists;
