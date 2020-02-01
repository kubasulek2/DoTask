import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Prompt } from 'react-router-dom';
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
import FileLink from '../../Components/UI/FileLink';
import { formatDate, formatNotification } from '../../Utils/date';
import * as actions from '../../Store/Actions';


const styles = ({ palette, spacing, breakpoints }) => ({
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
		minWidth: 245,
		margin: 'auto',
		[breakpoints.down('xs')]: {
			width: '95%'
		}
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
	clearPlaceholder: {
		width: 45,
		height: 45
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
		marginBottom: spacing(2.5),
		flexWrap: 'wrap',
	},
	subtaskInput: {
		display: 'flex',
		width: '100%',
		'& input': {
			width: 'calc(100% - 48px - 36px)'
		}
	},
	subtaskList: {
		width: '100%'
	},
	disabledColor: {
		color: palette.action.active
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
		position: 'relative',
		display: 'flex',
		width: '100%',
		marginBottom: spacing(1.5),
		'& input': {
			width: 'calc(100% - 48px - 36px)',
			cursor: 'pointer',
		}
	},
	hiddenInput: {
		position: 'absolute',
		bottom: 0,
		left: 48,
		opacity: 0,
		zIndex: 2
	},

	filesList: {
		width: '100%'
	},
	actions: {
		justifyContent: 'flex-end',
	},
	'@media (max-width: 450px)': {
		root: {
			'& input, & textarea': {
				fontSize: 13,
				padding: 6,
			},
		},
		header: {
			padding: '8px 0',
			'& button': {
				padding: 5
			}
		},
		title: {
			'input&': {
				fontSize: 18,
			}
		},
		checkbox: {
			padding: 0,
			paddingLeft: 6,
		},
		content: {
			padding: spacing(1),
			paddingTop: spacing(5),
			paddingLeft: 0,
		},
		clear: {
			paddingRight: 0,
		},
	}
});


class TaskExpand extends Component {
	state = null;
	subtaskRef = React.createRef();
	noteRef = React.createRef();
	fileRef = React.createRef();

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
			subtask: '',
			editMode: false,
		});
		document.addEventListener('keydown', this.handleEnter);
		window.addEventListener('beforeunload', this.handleUnload);
	}

	componentDidUpdate() {
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
			subtask: '',
			editMode: false,
		});
	}

	componentWillUnmount() {
		this.setState({ editMode: false });
		document.removeEventListener('keydown', this.handleEnter);
		window.removeEventListener('beforeunload', this.handleUnload);
	}

	handleUnload = event => {
		const { editMode } = this.state;
		if (editMode) {
			event.preventDefault();
			event.returnValue = 'You have unsaved changes, are you sure you want to leave ?';
			return 'You have unsaved changes, are you sure you want to leave ?';
		}
	}

	handleEnter = event => {
		const { editMode } = this.state;
		if (document.activeElement.id === this.subtaskRef.current.id && event.code === 'Enter') {
			this.handleSubtaskAdd();
		} else if (editMode && event.code === 'Enter') {
			this.handleSubmit();
		}
	}

	handleFavorite = () => this.setState(prev => ({ favorite: !prev.favorite, editMode: true }));


	moveCaretAtEnd = event => {
		const temp_value = event.target.value;
		event.target.value = '';
		event.target.value = temp_value;
	}

	handleChange = (event, type) => this.setState({ [type]: event.target.value, editMode: true });


	handleTaskDelete = () => {
		const { id } = this.state;
		const { history, deleteTask } = this.props;
		this.setState({ checked: true });
		deleteTask(id);
		setTimeout(() => {
			history.push(history.location.pathname.replace(`/${ id }`, ''));
		}, 400);
	}

	handleDate = date => this.setState({ deadline: moment(date).toISOString(), editMode: true });

	handleNotification = ({ number, unit }) => this.setState({ dialogOpen: false, notification: { number, unit }, editMode: true });

	closePopUp = () => this.setState({ pickerOpen: false, dialogOpen: false })

	handleClear = type => {
		const stringTypes = ['deadline', 'note'];
		const cleared = stringTypes.includes(type) ? '' : null;

		this.setState({ [type]: cleared, editMode: true });
	}

	handleSubtaskDelete = idx => {
		const subtasks = [...this.state.subtasks];

		subtasks.splice(idx, 1);
		this.setState({ subtasks: subtasks, editMode: true });
	}

	handleSubtaskAdd = () => {
		if (!this.state.subtask) return;
		const subtasks = [...this.state.subtasks];
		subtasks.push(this.state.subtask);
		this.setState({ subtasks: subtasks, subtask: '' });
	}

	handleNoteFocus = () => this.noteRef.current.focus();

	handleFileFocus = () => this.fileRef.current.click();

	handleNavigateBack = () => {
		const { id } = this.state;
		const { history } = this.props;
		history.push(history.location.pathname.replace(`/${ id }`, ''));
	}

	handleFileDelete = idx => {
		const files = [...this.state.files];

		files.splice(idx, 1);
		this.setState({ files: files, editMode: true });
	}


	handleFileAdd = event => {
		const files = [...this.state.files];

		// need to change file string values to object: name plus path, for now name only is added.
		files.push(event.target.value.replace(/^.+\\/, ''));
		this.setState({ files: files, editMode: true });
	}

	handleSubmit = () => {

		const { id, content, favorite, attachments, deadline, createdAt, note } = this.state;
		const task = {
			id, content, favorite, attachments, deadline, createdAt, note,
			subtasks: [...this.state.subtasks],
			notification: { ...this.state.notification },
			files: [...this.state.files]

		};
		this.setState(() => ({ editMode: false }), () => {
			this.props.modifyTask(task);
			this.handleNavigateBack();
		});

	}


	render() {
		const { tasks, match: { params }, classes } = this.props;

		if (Object.values(tasks).length && !Object.values(tasks).some(t => t.id === params.taskId)) return <FourOhFour />;
		if (!this.state) return null;

		const { favorite, content, deadline, note, subtasks, notification, files, checked, pickerOpen, dialogOpen, subtask, editMode } = this.state;

		const subtaskList = subtasks.map((t, i) => (
			<Subtask
				key={t + i}
				text={t}
				handleDelete={() => this.handleSubtaskDelete(i)}
			/>
		));

		const filesList = files.map((f, i) => (
			<FileLink
				key={f + i}
				text={f}
				url={'http://localhost:3000'}
				handleDelete={() => this.handleFileDelete(i)}
			/>
		));

		return (
			<div className={[classes.root, 'datePickerContainer'].join(' ')}>

				<Prompt
					when={editMode}
					message='You have unsaved changes, are you sure you want to leave?'
				/>
				<Card className={classes.card}>
					<form>
						<div className={classes.header}>
							<Tooltip enterDelay={800} title='finish task' arrow>
								<Checkbox
									className={classes.checkbox}
									disableRipple
									checked={checked}
									onChange={this.handleTaskDelete}
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
									: <div className={classes.clearPlaceholder} />}
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
									: <div className={classes.clearPlaceholder} />}
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
												<DateIcon className={subtask ? null : classes.disabledColor} />
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
									: <div className={classes.clearPlaceholder} />}
							</div>

							<div className={classes.files}>
								<div className={classes.filesInput}>
									<Tooltip enterDelay={800} title='Add file' arrow>
										<span>
											<IconButton
												onClick={this.handleFileFocus}
												color={files ? 'secondary' : 'default'}
											>
												<AttachFileIcon />
											</IconButton>
										</span>
									</Tooltip>
									<input
										className={classes.hiddenInput}
										ref={this.fileRef}
										type='file'
										placeholder='Add file'
										onChange={this.handleFileAdd}
									/>
									<input
										disabled
										type='text'
										placeholder='Add file'
									/>
								</div>
								<List dense className={classes.filesList}>
									{filesList}
								</List>
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
	deleteTask: taskId => dispatch(actions.deleteTask(taskId)),
	modifyTask: task => dispatch(actions.modifyTask(task)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TaskExpand));
