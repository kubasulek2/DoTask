import React, { Component, Fragment } from 'react';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import StarIcon from '@material-ui/icons/StarOutlined';
import StarBorderIcon from '@material-ui/icons/StarBorderOutlined';
import DateIcon from '@material-ui/icons/Event';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const styles = ({ palette, breakpoints, spacing }) => ({
	root: {
		background: palette.grey[200],
		borderRadius: spacing(.5),
		width: '100%',
		marginTop: spacing(4),
		marginBottom: spacing(6),
	},
	form: {
		display: 'flex',
	},
	main: {
		flexGrow: 1
	},
	input: {
		width: '100%',
		height: '100%',
		minWidth: 150,
		borderRadius: spacing(.5),
		background: palette.grey[200],
		fontSize: 16,
		padding: '12px 5px',
		border: 'none',
		color: palette.text.secondary,
		'&::placeholder': {
			color: palette.grey[400]
		},
		'&:focus': {
			outline: 'none'
		},
		[breakpoints.up('sm')]: {
			fontSize: 20,
			padding: '14px 8px',
		}
	},
	actions: {
		borderRadius: spacing(.5),
		background: palette.grey[300],
		flexGrow: 0,
		overflow: 'hidden',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexWrap: 'nowrap',
		width: 0,
		minWidth: 0,
		transition: '.4s all ease',
		'&.focused': {
			width: 100,
			minWidth: 100,
		},
		[breakpoints.up('sm')]: {
			'&.focused': {
				width: 120,
				minWidth: 120,
			}
		}

	},
	iconButton: {
		padding: 5,
		height: 36,
		[breakpoints.up('sm')]: {
			padding: 6,
			height: 42,
		}
	},
	favorite: {

	}
});

class CreateTask extends Component {
	state = {
		value: '',
		deadline: '',
		notification: '',
		focused: false,
		favorite: false
	}

	handleSubmit = event => {
		event.preventDefault();
	}

	handleChange = event => this.setState({ value: event.target.value })
	handleFavorite = () => this.setState(prev => ({ favorite: !prev.favorite }))

	render() {
		const { classes } = this.props;
		const { value, focused, favorite } = this.state;

		return (
			<ClickAwayListener onClickAway={() => this.setState({ focused: false })}>
				<div className={classes.root}>
					<form onSubmit={this.handleSubmit} className={classes.form}>
						<div className={classes.main}>
							<input
								type='text'
								placeholder='Add a task'
								className={classes.input}
								value={value}
								onChange={this.handleChange}
								onClick={() => this.setState({ focused: true })}
							/>
						</div>
						<div className={[classes.actions, focused ? 'focused' : null].join(' ')}>
							<IconButton className={classes.iconButton}>
								<DateIcon />
							</IconButton>
							<IconButton className={classes.iconButton}>
								<NotificationsIcon />
							</IconButton>
							<IconButton onClick={this.handleFavorite} className={classes.iconButton}>
								{favorite ? <StarIcon className={classes.favorite}/> : <StarBorderIcon className={classes.favorite}/>}
							</IconButton>
						</div>
					</form>
				</div>
			</ClickAwayListener>
		);
	}
}

export default withStyles(styles)(CreateTask);
