import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { Droppable } from 'react-beautiful-dnd';


import TasksListsItem from './TasksListsItem';

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
		<Droppable droppableId='lists' type='list'>
			{({ innerRef, placeholder, droppableProps }) => (
				<List className={classes.root} ref={innerRef} {...droppableProps}>
					{listsOrder.map((id, i) => (
						<TasksListsItem key={id + i} active={active} setCategory={setCategory} list={lists[id]} index={i} />
					))}
					{placeholder}
				</List>
			)}
		</Droppable>
	);
};
export default TasksLists;
