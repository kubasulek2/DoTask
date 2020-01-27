import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import DragIcon from '@material-ui/icons/DragIndicator';
import GradeIcon from '@material-ui/icons/Grade';
import GradeOutlinedIcon from '@material-ui/icons/GradeOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import IconButton from '@material-ui/core/IconButton';

import { formatDate, hasDatePassed } from '../../../Utils/date';

const useStyles = makeStyles(({ spacing, palette }) => ({
	root: {
		padding: 0,
		width: '100%',
		marginBottom: spacing(.5),
	},
	paper: {
		display: 'flex',
		width: '100%',
		transition: 'all .2s ease',
		'&.moved': {
			width: 270
		}
	},
	drag: {
		position: 'relative',
		right: 0,
		width: 35,
		borderTopRightRadius: 4,
		borderBottomRightRadius: 4,
		background: palette.text.white,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: spacing(1)
	},
	dragged: {
		opacity: .7
	},
	shrink: {
		width: 100,
	},
	checkbox: {
		padding: 2,
		color: palette.secondary.dark,
		'&:hover': {
			backgroundColor: 'transparent',
		},
	},
	expand: {
		padding: spacing(1),
		paddingLeft: spacing(1),
		flexGrow: 1,
		cursor: 'pointer',
	},
	title: {
	},
	dragIcon: {
		width: 24,
		height: 24,
		color: palette.secondary.dark
	},
	actions: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	favorite: {
		padding: spacing(.6),
		marginLeft: 3,
		'& svg': {
			fontSize: 28
		}
	},
	attachment: {
		fontSize: 18,
		color: palette.grey[600]
	},
	date: {
		fontSize: 12,
		color: palette.primary.light
	},
	datePassed: {
		color: palette.error.light
	}
}));

const Task = ({ text, id, index, favorite, attachments, deadline }) => {
	const classes = useStyles();
	const date = formatDate(deadline);
	const datePassed = hasDatePassed(deadline);

	return (
		<Draggable draggableId={id} index={index}>
			{({ draggableProps, dragHandleProps, innerRef }, snapshot) => (
				<ListItem
					className={[classes.root, snapshot.isDragging ? classes.dragged : null].join(' ')}
					ref={innerRef}
					{...draggableProps}

				>
					<Paper className={[classes.paper, snapshot.isDragging ? 'moved' : null].join(' ')}>
						<div
							className={classes.drag}
							{...dragHandleProps}
						>
							<DragIcon className={classes.dragIcon} />
						</div>
						<Checkbox
							className={classes.checkbox}
							disableRipple
							checked={false}
							onChange={() => { }}
							value="primary"
						/>
						<div className={classes.expand}>
							<ListItemText
								primary={text}
								primaryTypographyProps={{
									noWrap: true,
									classes: { root: [classes.title, snapshot.isDragging ? classes.shrink : null].join(' ') },
									component: 'div'
								}}
							/>
						</div>
						<div className={classes.actions}>
							{attachments ? <AttachFileIcon className={classes.attachment} /> : null}
							<p className={[classes.date, datePassed ? classes.datePassed : null].join(' ')}>{date}</p>
							<IconButton className={classes.favorite}>
								{favorite ? <GradeIcon color='secondary' /> : <GradeOutlinedIcon color='secondary' />}
							</IconButton>
						</div>
					</Paper>
				</ListItem>
			)}
		</Draggable>
	);
};

export default Task;
