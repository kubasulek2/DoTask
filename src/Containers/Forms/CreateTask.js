import React, { Component } from 'react';
import moment from 'moment';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import StarIcon from '@material-ui/icons/StarOutlined';
import StarBorderIcon from '@material-ui/icons/StarBorderOutlined';
import DateIcon from '@material-ui/icons/Event';

import DatePicker from '../../Components/UI/DatePicker';
import NotificationDialog from '../../Components/UI/NotificationDialog';

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
		padding: spacing(.6),
		marginLeft: 2,
		'& svg': {
			fontSize: 22
		},
		[breakpoints.up('sm')]: {
			'& svg': {
				fontSize: 24
			}
		}
	},
	favorite: {
		color: palette.secondary.dark
	},
	active: { color: palette.primary.dark }
});

class CreateTask extends Component {
	state = {
		value: '',
		deadline: '',
		notification: null,
		focused: false,
		favorite: false,
		pickerOpen: false,
		dialogOpen: false
	}

	wrapperRef = React.createRef();
	inputRef = React.createRef();

	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside);
	}

	componentDidUpdate(prevState) {
		if (prevState.deadline !== this.state.deadline) this.inputRef.current.focus();
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
	}

	handleClickOutside = event => {
		if (this.wrapperRef.current && !this.wrapperRef.current.contains(event.target)) {
			this.setState({ focused: false });
		}
	}

	handleSubmit = event => {
		event.preventDefault();
		if (!this.state.value) return;
		let createdAt = moment(Date.now()).toISOString();
		let deadline = this.state.deadline || moment(Date.now()).toISOString();
	}

	handleTitle = event => this.setState({ value: event.target.value })
	handleFavorite = () => this.setState(prev => ({ favorite: !prev.favorite }))
	handleDate = date => this.setState({ deadline: moment(date).toISOString() });
	openPicker = () => this.setState({ pickerOpen: true });
	closePicker = () => {
		this.setState(() => ({ focused: true, pickerOpen: false }));
	};
	openDialog = () => this.setState({ dialogOpen: true });
	closeDialog = () => {
		this.setState(() => ({ focused: true, dialogOpen: false, notification: null }));
	};
	handleNotification = ({ number, unit }) => this.setState({ focused: true, dialogOpen: false, notification: { number, unit } })


	render() {
		const { classes } = this.props;
		const { value, focused, favorite, deadline, notification, pickerOpen, dialogOpen } = this.state;

		return (
			<div
				className={classes.root}
				ref={this.wrapperRef}
			>
				<form
					onSubmit={this.handleSubmit}
					className={classes.form}
				>
					<div className={classes.main}>
						<input
							ref={this.inputRef}
							type='text'
							placeholder='Add a task'
							className={classes.input}
							value={value}
							onChange={this.handleTitle}
							onClick={() => this.setState({ focused: true })}
						/>
					</div>
					<div className={[classes.actions, focused ? 'focused' : null].join(' ')}>
						<IconButton className={classes.iconButton} onClick={this.openPicker}>
							<DateIcon color='disabled' className={deadline ? classes.active : null} />
						</IconButton>
						<IconButton className={classes.iconButton} onClick={this.openDialog}>
							<NotificationsIcon color='disabled' className={notification ? classes.active : null} />
						</IconButton>
						<IconButton onClick={this.handleFavorite} className={classes.iconButton}>
							{favorite ? <StarIcon className={classes.favorite} /> : <StarBorderIcon className={classes.favorite} />}
						</IconButton>
						<DatePicker
							date={deadline}
							handleDate={this.handleDate}
							isOpen={pickerOpen}
							handleClose={this.closePicker}
							pickerRef={this.pickerRef}
						/>
						<NotificationDialog open={dialogOpen} handleClose={this.closeDialog} value={notification} handleNotification={this.handleNotification} />
					</div>
				</form>
			</div>
		);
	}
}

export default withStyles(styles)(CreateTask);
