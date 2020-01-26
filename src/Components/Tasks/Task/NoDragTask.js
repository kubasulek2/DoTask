import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';

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
	expand: {
		padding: spacing(1),
		paddingLeft: spacing(2),
		flexGrow: 1,
		cursor: 'pointer',
	},
	shrink: {
		width: 100,
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

const Task = ({ text, favorite }) => {
	const classes = useStyles();
	return (
		<ListItem
			className={classes.root}
		>
			<Paper className={classes.paper}>
				<div className={classes.expand}>
					<ListItemText
						primary={text}
						primaryTypographyProps={{
							noWrap: true,
							component: 'div'
						}}
					/>
				</div>
				<IconButton>
					<Add />
				</IconButton>
			</Paper>
		</ListItem>
	);
};

export default Task;
