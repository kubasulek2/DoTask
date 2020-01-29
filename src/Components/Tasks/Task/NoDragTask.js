import React, { useState } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import StarOutlinedIcon from '@material-ui/icons/StarOutlined';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import Tooltip from '@material-ui/core/Tooltip';

import { formatDate, hasDatePassed } from '../../../Utils/date';
import * as actions from '../../../Store/Actions/';

const useStyles = makeStyles(({ spacing, palette, breakpoints }) => ({
	root: {
		padding: 0,
		width: '100%',
		minWidth: 230,
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
		padding: 5,
		paddingLeft: 8,
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
		overflowX: 'hidden',
	},
	title: {
		fontSize: 14
	},
	actions: {
		flexGrow: 0,
		display: 'flex',
		justifyContent: 'flex-end',
		alignItems: 'center',
		minWidth: 108
	},
	favorite: {
		padding: spacing(.6),
		marginLeft: 3,
		'& svg': {
			fontSize: 24
		}
	},
	attachment: {
		fontSize: 15,
		color: palette.grey[600]
	},
	date: {
		fontSize: 11,
		color: palette.primary.light
	},
	datePassed: {
		color: palette.error.light
	},
	[breakpoints.up('sm')]: {
		checkbox: {
			paddingLeft: 12
		},
		title: {
			fontSize: 18
		},
		date: {
			fontSize: 12,
		},
		attachment: {
			fontSize: 18,
		},
		favorite: {
			'& svg': {
				fontSize: 28
			}
		},
		actions: {
			paddingRight: spacing(1)
		}
	},
	[breakpoints.up('md')]: {
		root: {
			marginBottom: spacing(1.5)
		}
	}
}));

const Task = ({ text, id, favorite, attachments, deadline, deleteTask, setTaskFavorite }) => {
	const classes = useStyles();
	const date = formatDate(deadline);
	const datePassed = hasDatePassed(deadline);
	const [checked, setChecked] = useState(false);

	const handleChange = () => {
		setChecked(checked => !checked);
		deleteTask(id);
	};
	const handleFavorite = () => {
		setTaskFavorite(id);
	};


	return (
		<ListItem
			className={classes.root}
		>
			<Paper className={classes.paper}>
				<Tooltip enterDelay={800} title='finish task' arrow>
					<Checkbox
						className={classes.checkbox}
						disableRipple
						checked={checked}
						onChange={handleChange}
						value="primary"
					/>
				</Tooltip>
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
					{attachments
						? <Tooltip enterDelay={800} title='task has attachments' arrow>
							<AttachFileIcon className={classes.attachment} />
						</Tooltip>
						: null
					}
					<p className={[classes.date, datePassed ? classes.datePassed : null].join(' ')}>{date}</p>
					<Tooltip enterDelay={800} title='favorite' arrow>
						<IconButton className={classes.favorite} onClick={handleFavorite}>
							{favorite ? <StarOutlinedIcon color='secondary' /> : <StarBorderOutlinedIcon color='secondary' />}
						</IconButton>
					</Tooltip>
				</div>
			</Paper>
		</ListItem>
	);
};

const mapDispatchToProps = dispatch => ({
	deleteTask: taskId => dispatch(actions.deleteTask(taskId)),
	setTaskFavorite: taskId => dispatch(actions.setTaskFavorite(taskId)),
});

export default connect(null, mapDispatchToProps)(Task);
