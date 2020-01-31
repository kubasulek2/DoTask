import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';


import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import StarIcon from '@material-ui/icons/StarOutlined';
import StarBorderIcon from '@material-ui/icons/StarBorderOutlined';
import NotificationsIcon from '@material-ui/icons/Notifications';
import DateIcon from '@material-ui/icons/Event';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';

import DatePicker from '../../Components/UI/DatePicker';
import NotificationDialog from '../../Components/UI/NotificationDialog';
import FourOhFour from '../../Components/FourOhFour';
import Subtask from '../../Components/Tasks/Task/Subtask';
import { formatDate, formatNotification } from '../../Utils/date';
import * as actions from '../../Store/Actions';


const styles = ({ palette, spacing }) => ({
	root: {
		width: '100%',
		paddingTop: 24,
		'& input, & textarea': {
			display: 'block',
			width: '100%',
			background: 'transparent',
			color: palette.secondary.dark,
			fontSize: 16,
			padding: 8,
			border: 'none',
			borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
			fontFamily: 'Open Sans,Roboto,Helvetica,Arial,sans-serif',
			'&::placeholder': {
				color: palette.grey[400]
			},
			'&:focus': {
				outline: 'none'
			},
			'&:disabled': {
				background: 'transparent'
			}
		}
	},
	card: {
		maxWidth: 500,
		width: '80%',
		minWidth: 300,
		margin: 'auto',
	},
	header: {
		background: palette.grey[200],
		display: 'flex',
		padding: spacing(2),
		alignItems: 'center',
	},
	title: {
		flexGrow: 1,
		'input&': {
			cursor: 'pointer',
			borderBottom: 'none',
			whiteSpace: 'nowrap',
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			width: 150,
			color: palette.text.secondary,
			fontSize: 24,
			fontWeight: 'bold',
		}
	},
	checkbox: {
		padding: 5,
		color: palette.primary.dark,
		'&:hover': {
			backgroundColor: 'transparent',
		},
	},
	content: {
		paddingTop: spacing(7),
		//paddingLeft: spacing(1)
	},
	clear: {
		padding: spacing(1),
		paddingLeft: spacing(.5),
		color: palette.error.light,
		cursor: 'pointer',
		'& svg': {
			padding: 3
		}
	},
	deadline: {
		display: 'flex',
		alignItems: 'center',
		marginBottom: spacing(1),
	},
	notification: {
		display: 'flex',
		alignItems: 'center',
		marginBottom: spacing(1),
	},
	subtask: {
		display: 'flex',
		alignItems: 'center',
		marginBottom: spacing(2),
		flexWrap: 'wrap',
	},
	subtaskInput: {
		display: 'flex',
		width: '100%',
		marginBottom: spacing(1.5),
		'& input': {
			width: 'calc(100% - 48px - 36px)'
		}
	},
	subtaskList: {
		width: '100%'
	},

	note: {
		display: 'flex',
		alignItems: 'flex-start',
		marginBottom: spacing(2),
	},
	files: {
		display: 'flex',
		alignItems: 'center',
		marginBottom: spacing(2),
		flexWrap: 'wrap',
	},
	filesInput: {
		display: 'flex',
		width: '100%',
		marginBottom: spacing(1.5),
		'& input': {
			width: 'calc(100% - 48px - 36px)'
		}
	},
	filesList: {
		width: '100%'
	},
	actions: {
		justifyContent: 'flex-end',
	}
});


class TaskExpand extends Component {
	state = null;
	subtaskRef = React.createRef();
	noteRef = React.createRef();

	componentDidMount() {
		const { tasks, match: { params } } = this.props;
		const task = tasks[params.taskId];
		if (!this.state && task) this.setState({
			...task,
			files: [...task.files],
			notification: task.notification ? { ...task.notification } : null,
			subtasks: [...task.subtasks],
			checked: false,
			pickerOpen: false,
			dialogOpen: false,
			subtask: ''
		});
		document.addEventListener('keydown', this.handleEnter);

	}
	componentWillUnmount() {
		const { editMode } = this.props;
		let confirm;
		if (editMode) {
			confirm = window.confirm('You will lost all changes');
			if (!confirm) return;
		}
		this.props.setEditMode(false);
		document.removeEventListener('keydown', this.handleEnter);
	}

	handleEnter = event => {
		const { editMode } = this.props;
		if (document.activeElement.id === this.subtaskRef.current.id && event.code === 'Enter') {
			this.handleSubtaskAdd();
		} else if (editMode && event.code === 'Enter') {
			this.handleSubmit();
		}
	}

	handleFavorite = () => {
		const { setTaskFavorite } = this.props;
		const { id } = this.state;
		setTaskFavorite(id);
	};

	moveCaretAtEnd = event => {
		const temp_value = event.target.value;
		event.target.value = '';
		event.target.value = temp_value;
	}

	handleChange = (event, type) => {
		const { editMode, setEditMode } = this.props;
		if (!editMode) setEditMode(true);
		this.setState({ [type]: event.target.value });
	}

	handleDelete = () => {
		const { id } = this.state;
		const { history, deleteTask } = this.props;
		this.setState({ checked: true });
		deleteTask(id);
		setTimeout(() => {
			history.push(history.location.pathname.replace(`/${ id }`, ''));
		}, 400);
	}

	handleDate = date => {
		const { editMode, setEditMode } = this.props;
		if (!editMode) setEditMode(true);
		this.setState({ deadline: moment(date).toISOString() });
	};

	handleNotification = ({ number, unit }) => {
		const { editMode, setEditMode } = this.props;
		if (!editMode) setEditMode(true);
		this.setState({ dialogOpen: false, notification: { number, unit } });
	}

	closePopUp = () => this.setState({ pickerOpen: false, dialogOpen: false })

	handleClear = type => {
		const stringTypes = ['deadline', 'note'];
		const cleared = stringTypes.includes(type) ? '' : null;
		const { editMode, setEditMode } = this.props;

		if (!editMode) setEditMode(true);

		this.setState({ [type]: cleared });
	}

	handleSubtaskDelete = idx => {
		const { editMode, setEditMode } = this.props;
		const subtasks = [...this.state.subtasks];

		if (!editMode) setEditMode(true);

		subtasks.splice(idx, 1);
		this.setState({ subtasks: subtasks });
	}

	handleSubtaskAdd = () => {
		if (!this.state.subtask) return;
		const subtasks = [...this.state.subtasks];
		subtasks.push(this.state.subtask);
		this.setState({ subtasks: subtasks, subtask: '' });
	}

	handleNoteFocus = () => this.noteRef.current.focus();

	handleSubmit = () => {

	}
	handleNavigateBack = () => {
		const { id } = this.state;
		const { history } = this.props;
		history.push(history.location.pathname.replace(`/${ id }`, ''));
	}


	render() {
		const { tasks, match: { params }, classes, editMode } = this.props;

		if (Object.values(tasks).length && !Object.values(tasks).some(t => t.id === params.taskId)) return <FourOhFour />;
		if (!this.state) return null;

		const { favorite, content, deadline, note, subtasks, notification, files, checked, pickerOpen, dialogOpen, subtask } = this.state;

		const subtaskList = subtasks.map((t, i) => (
			<Subtask
				key={t + i}
				text={t}
				handleDelete={() => this.handleSubtaskDelete(i)}
			/>
		));

		return (
			<div className={classes.root}>
				<Card className={classes.card}>
					<form>
						<div className={classes.header}>
							<Tooltip enterDelay={800} title='finish task' arrow>
								<Checkbox
									className={classes.checkbox}
									disableRipple
									checked={checked}
									onChange={this.handleDelete}
									value="primary"
								/>
							</Tooltip>
							<input
								placeholder='add a title'
								type='text'
								className={classes.title}
								value={content}
								onChange={(event) => this.handleChange(event, 'content')}
								onFocus={this.moveCaretAtEnd}
							/>
							<IconButton color='secondary' onClick={this.handleFavorite}>
								{favorite ? <StarIcon /> : <StarBorderIcon />}
							</IconButton>

						</div>
						<Divider />
						<CardContent className={classes.content}>

							<div className={classes.deadline}>
								<Tooltip enterDelay={800} title='Change date' arrow>
									<IconButton
										color={deadline ? 'secondary' : 'default'}
										onClick={() => this.setState({ pickerOpen: true })}
									>
										<DateIcon />
									</IconButton>
								</Tooltip>
								<input
									type='text'
									placeholder='date'
									disabled
									value={deadline ? formatDate(deadline) : ''}
								/>
								{deadline
									? <div className={classes.clear} onClick={() => this.handleClear('deadline')}>
										<ClearIcon />
									</div>
									: null}
							</div>

							<div className={classes.notification}>
								<Tooltip enterDelay={800} title='Change notification' arrow>
									<IconButton
										color={notification ? 'secondary' : 'default'}
										onClick={() => this.setState({ dialogOpen: true })}
									>
										<NotificationsIcon />
									</IconButton>
								</Tooltip>
								<input
									type='text'
									placeholder='notification'
									disabled
									value={notification ? formatNotification(notification) : ''}
								/>
								{notification
									? <div className={classes.clear} onClick={() => this.handleClear('notification')}>
										<ClearIcon />
									</div>
									: null}
							</div>

							<div className={classes.subtask}>
								<div className={classes.subtaskInput}>
									<Tooltip enterDelay={800} title='Add subtask' arrow>
										<span>
											<IconButton
												disabled={subtask ? false : true}
												color='secondary'
												onClick={this.handleSubtaskAdd}
											>
												<DateIcon />
											</IconButton>
										</span>
									</Tooltip>
									<input
										ref={this.subtaskRef}
										type='text'
										placeholder='Add subtask'
										value={subtask}
										onChange={(event) => this.handleChange(event, 'subtask')}
									/>
								</div>
								<List dense className={classes.subtaskList}>
									{subtaskList}
								</List>
							</div>

							<div className={classes.note}>
								<Tooltip enterDelay={800} title='Change note' arrow>
									<IconButton
										color={note ? 'secondary' : 'default'}
										onClick={this.handleNoteFocus}
									>
										<AddIcon />
									</IconButton>
								</Tooltip>
								<textarea
									ref={this.noteRef}
									onChange={(event) => this.handleChange(event, 'note')}
									onFocus={this.moveCaretAtEnd}
									rows={6}
									placeholder='Add a note'
									value={note}
								/>
								{note
									? <div className={classes.clear} onClick={() => this.handleClear('note')}>
										<ClearIcon />
									</div>
									: null}
							</div>

						</CardContent>
						<CardActions className={classes.actions}>
							<Button
								color='secondary'
								size='large'
								onClick={this.handleNavigateBack}
							>
								{editMode ? 'cancel' : 'ok'}
							</Button>
							{editMode && content
								? <Button
									color='primary'
									size='large'
									onClick={this.handleSubmit}
								>
									Accept
								</Button>
								: null}
						</CardActions>
					</form>

					<DatePicker
						date={deadline}
						handleDate={this.handleDate}
						isOpen={pickerOpen}
						handleClose={this.closePopUp}
					/>

					<NotificationDialog open={dialogOpen} handleClose={this.closePopUp} value={notification} handleNotification={this.handleNotification} />
				</Card>
			</div>
		);
	}
}

const mapStateToProps = ({ tasks, app }) => ({
	tasks: tasks.tasks,
	editMode: app.editMode
});

const mapDispatchToProps = dispatch => ({
	setEditMode: bool => dispatch(actions.setEditMode(bool)),
	setTaskFavorite: taskId => dispatch(actions.setTaskFavorite(taskId)),
	deleteTask: taskId => dispatch(actions.deleteTask(taskId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TaskExpand));
