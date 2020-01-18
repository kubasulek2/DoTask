import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import ListItemText from '@material-ui/core/ListItemText';
import DragIcon from '@material-ui/icons/DragIndicator';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing, palette }) => ({
	root: {
		padding: 0,
		marginBottom: spacing(.5)
	},
	paper: {
		display: 'flex',
		width: '100%'
	},
	drag: {
		position: 'relative',
		right: 0,
		width: 40,
		borderTopRightRadius: 4,
		borderBottomRightRadius: 4,
		background: palette.text.white,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: spacing(1)
	},
	expand: {
		padding: spacing(1),
		paddingLeft: spacing(2),
		flexGrow: 1,
		cursor: 'pointer',
	},
	icon: {
		width: 24,
		height: 24,
		color: palette.secondary.dark
	},
	dragged: {
		opacity: .7
	}
}));

const Task = ({ text, id, index }) => {
	const classes = useStyles();
	return (
		<Draggable draggableId={id} index={index}>
			{({ draggableProps, dragHandleProps, innerRef }, snapshot) => (
				<ListItem
					className={[classes.root, snapshot.isDragging ? classes.dragged : null].join(' ')}
					ref={innerRef}
					{...draggableProps}
					
				>
					<Paper className={classes.paper}>
						<div className={classes.expand}>
							<ListItemText primary={text} />
						</div>
						<div 
							className={classes.drag}
							{...dragHandleProps}
						>
							<DragIcon className={classes.icon}/>
						</div>
					</Paper>
				</ListItem>
			)}
		</Draggable>
	);
};

export default Task;
