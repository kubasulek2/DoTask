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
import RootRef from '@material-ui/core/RootRef';
import { Droppable } from 'react-beautiful-dnd';

const useStyles = makeStyles(({ spacing, palette }) => ({
	root: {
		paddingTop: spacing(2.5),
		flexGrow: 1,
		paddingBottom: 64
	},
	listItem: {
		padding: spacing(.5)
	},
	over: {
		background: palette.secondary.light + '!important'
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

const TasksLists = ({ tasks: { columns, columnOrder, active }, setCategory }) => {
	const classes = useStyles();

	return (
		<List className={classes.root}>
			{columnOrder.map((t, i) => {
				return (
					<Droppable droppableId={t} key={t + i}>
						{({ droppableProps, innerRef, placeholder }, snapshot) => (
							<RootRef rootRef={innerRef}>
								<ListItem
									{...droppableProps}
									className={[classes.listItem, snapshot.isDraggingOver ? classes.over : null].join(' ')}
									button
									selected={t === active}
									onClick={() => setCategory(t)}
								>
									<ListItemIcon className={classes.icon}>
										<ListIcon />
									</ListItemIcon>
									<ListItemText
										secondary={columns[t].title}
										classes={{ secondary: active ? classes.secondary_edit : classes.secondary }}
										primaryTypographyProps={{
											noWrap: true,
											component: 'p'
										}}
									/>
									{placeholder}
									<ListItemSecondaryAction>
										{t === active ? <IconButton size='small' className={classes.editIcon}><EditIcon /></IconButton> : null}
										<span className={classes.badge}>6</span>
									</ListItemSecondaryAction>
								</ListItem>
							</RootRef>
						)}
					</Droppable>

				);
			})}
		</List>
	);
};

export default TasksLists;
