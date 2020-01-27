import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import StarOutlinedIcon from '@material-ui/icons/StarOutlined';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';

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
	checkbox: {
		padding: 8,
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

const Task = ({ text, favorite, attachments, deadline }) => {
	const classes = useStyles();
	const date = formatDate(deadline);
	const datePassed = hasDatePassed(deadline);

	return (
		<ListItem
			className={classes.root}
		>
			<Paper className={classes.paper}>
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
							classes: { root: classes.title },
							component: 'div'
						}}
					/>
				</div>
				<div className={classes.actions}>
					{attachments ? <AttachFileIcon className={classes.attachment} /> : null}
					<p className={[classes.date, datePassed ? classes.datePassed : null].join(' ')}>{date}</p>
					<IconButton className={classes.favorite}>
						{favorite ? <StarOutlinedIcon color='secondary' /> : <StarBorderOutlinedIcon color='secondary' />}
					</IconButton>
				</div>
			</Paper>
		</ListItem>
	);
};

export default Task;
