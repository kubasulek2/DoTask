import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import StarIcon from '@material-ui/icons/StarOutlined';
import StarBorderIcon from '@material-ui/icons/StarBorderOutlined';
import DateIcon from '@material-ui/icons/Event';

import DatePicker from '../../Components/UI/DatePicker';
import NotificationDialog from '../../Components/UI/NotificationDialog';
import * as actions from '../../Store/Actions';

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
	active: { color: palette.primary.dark },
	hidden: {
		visibility: 'hidden',
		position: 'absolute',
		left: 9999,
	}
});

const initialState = {
	value: '',
	deadline: '',
	notification: null,
	focused: false,
	favorite: false,
	pickerOpen: false,
	dialogOpen: false
};

class CreateTask extends Component {
	state = initialState;
	wrapperRef = React.createRef();
	inputRef = React.createRef();

	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside);
		document.addEventListener('keydown', this.submitOnEnter);
	}

	componentDidUpdate(prevState) {
		if ((prevState.deadline !== this.state.deadline) ||
			(prevState.state.notification !== this.state.notification)) {
			this.inputRef.current.focus();
		}
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
		document.removeEventListener('keydown', this.submitOnEnter);
	}

	submitOnEnter = event => {
		if (document.activeElement.id === this.inputRef.current.id && event.code === 'Enter') {
			this.handleSubmit();
		}
	};
	handleClickOutside = event => {
		if (this.wrapperRef.current && !this.wrapperRef.current.contains(event.target)) {
			this.setState({ focused: false });
		}
	}

	handleTitle = event => this.setState({ value: event.target.value })

	handleFavorite = () => this.setState(prev => ({ favorite: !prev.favorite }))

	handleDate = date => this.setState({ deadline: moment(date).toISOString() });

	openPicker = () => this.setState({ pickerOpen: true });

	closePicker = () => {
		this.setState({ focused: true, pickerOpen: false });
	};

	openDialog = () => this.setState({ dialogOpen: true });

	closeDialog = () => {
		this.setState(() => ({ focused: true, dialogOpen: false, notification: null }));
	};
	handleNotification = ({ number, unit }) => this.setState({ focused: true, dialogOpen: false, notification: { number, unit } })

	handleSubmit = () => {

		if (!this.state.value) return;

		const { createTask, listId } = this.props;
		const createdAt = moment(Date.now()).toISOString();
		const deadline = this.state.deadline;
		const task = {
			content: this.state.value,
			deadline,
			createdAt,
			favorite: this.state.favorite
		};
		this.setState(() => initialState, () => createTask(task, listId));
	}

	render() {
		const { classes, listId } = this.props;
		const { value, focused, favorite, deadline, notification, pickerOpen, dialogOpen } = this.state;
		
		const placeholder = listId === 'default' ? 'Add a task to default list' : 'Add a task';

		return (
			<div
				className={[classes.root]}
				ref={this.wrapperRef}
			>
				<form
					onSubmit={this.handleSubmit}
					className={classes.form}
				>
					<div className={classes.main}>
						<input
							id='task-input'
							ref={this.inputRef}
							autoComplete='off'
							type='text'
							placeholder={placeholder}
							className={classes.input}
							value={value}
							onChange={this.handleTitle}
							onClick={() => this.setState({ focused: true })}
						/>
					</div>
					<div className={[classes.actions, 'datePickerContainer', focused ? 'focused' : null].join(' ')}>
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

const mapDispatchToProps = dispatch => ({
	createTask: (task, listId) => dispatch(actions.createTask(task, listId))
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(CreateTask));
