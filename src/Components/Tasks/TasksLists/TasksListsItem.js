import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListIcon from '@material-ui/icons/List';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(({ spacing, palette }) => ({
	listItem: {
		padding: 0,
		minHeight: 36
	},
	innerList: {
		padding: spacing(.5),
		margin: 0,
		width: '100%',
		minHeight: 36,
		display: 'flex',
		listStyle: 'none',
		alignItems: 'center',
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

const TasksListsItem = ({ handleClick, active, list, index, handleActive }) => {
	const classes = useStyles();
	const clicked = 	event => {
		handleClick(event);
		handleActive();
	};
	return (
		<Draggable draggableId={list.id} index={index}>
			{(draggable) => (
				<ListItem
					ref={draggable.innerRef}
					{...draggable.draggableProps}
					className={classes.listItem}
					button
					selected={list.id === active}
					onClick={clicked}
					data-type={list.id}
				>
					<Droppable droppableId={list.id}>
						{({ droppableProps, innerRef, placeholder }, snapshot) => (
							<ul
								className={[classes.innerList, snapshot.isDraggingOver ? classes.over : null].join(' ')}
								ref={innerRef}
								{...droppableProps}
							>
								<ListItemIcon className={classes.icon} {...draggable.dragHandleProps}>
									<ListIcon />
								</ListItemIcon>
								<ListItemText
									secondary={list.title}
									classes={{ secondary: active ? classes.secondary_edit : classes.secondary }}
									primaryTypographyProps={{
										noWrap: true,
										component: 'p'
									}}
								/>
								{placeholder}
								{list.id === active ? <IconButton size='small' className={classes.editIcon}><EditIcon /></IconButton> : null}
								<span className={classes.badge}>{list.taskIds.length}</span>
							</ul>
						)}
					</Droppable>
				</ListItem>
			)}
		</Draggable>
	);
};

export default TasksListsItem;
