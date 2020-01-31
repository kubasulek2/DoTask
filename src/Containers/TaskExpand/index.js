import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import StarIcon from '@material-ui/icons/StarOutlined';
import StarBorderIcon from '@material-ui/icons/StarBorderOutlined';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';

import FourOhFour from '../../Components/FourOhFour';
import * as actions from '../../Store/Actions';


const styles = ({ palette, spacing }) => ({
	root: {
		width: '100%',
		paddingTop: 24,
		'& input': {
			fontSize: 16,
			padding: 8,
			border: 'none',
			fontFamily: 'Open Sans,Roboto,Helvetica,Arial,sans-serif',
			'&::placeholder': {
				color: palette.grey[400]
			},
			'&:focus': {
				outline: 'none'
			},
		}
	},
	card: {
		maxWidth: 600,
		width: '80%',
		minWidth: 280,
		margin: 'auto',
	},
	header: {
		display: 'flex',
		padding: spacing(2),
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		'input&': {
			display: 'block',
			color: palette.text.secondary,
			flexGrow: 1,
			fontSize: 24,
			fontWeight: 'bold',
		}
	},
	editButton: {
		color: palette.error.light
	}
});


class TaskExpand extends Component {
	state = null
	componentDidMount() {
		const { tasks, match: { params } } = this.props;
		const task = tasks[params.taskId];
		if (!this.state && task) this.setState({
			...task,
			files: [...task.files],
			notification: task.notification ? [...task.notification] : null,
			subtasks: [...task.subtasks],
			checked: false
		});

	}
	componentWillUnmount() {
		this.props.setEditMode(false);
	}

	handleFavorite = () => {
		const { setTaskFavorite } = this.props;
		const { id } = this.state;
		setTaskFavorite(id);
	};

	handleChange = (event, type) => {
		const { editMode, setEditMode } = this.props;
		if (!editMode) setEditMode(true);
		this.setState({ [type]: event.target.value });
	}

	handleDelete = () => {
		const { id } = this.state;
		const { history, deleteTask } = this.props;
		this.setState({checked: true});
		deleteTask(id);
		setTimeout(() => {
			history.push(history.location.pathname.replace(`/${id}`,''));
		},400);
	}


	render() {
		const { tasks, match: { params }, classes, editMode } = this.props;

		if (Object.values(tasks).length && !Object.values(tasks).some(t => t.id === params.taskId)) return <FourOhFour />;
		if (!this.state) return null;
		const { favorite, content, deadline, createdAt, note, subtasks, notification, files, checked } = this.state;

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
								type='text'
								className={classes.title}
								value={content}
								onChange={(event) => this.handleChange(event, 'content')}
								ref={this.searchRef}
							/>
							<IconButton color='secondary' onClick={this.handleFavorite}>
								{favorite ? <StarIcon /> : <StarBorderIcon />}
							</IconButton>

						</div>
						<CardContent>
						</CardContent>
						<CardActions>
							<Button variant='contained' color='primary' size='large'>Cancel</Button>
						</CardActions>
					</form>
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
	setEditMode: bool => dispatch({ type: 'ABC', bool }),
	setTaskFavorite: taskId => dispatch(actions.setTaskFavorite(taskId)),
	deleteTask: taskId => dispatch(actions.deleteTask(taskId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TaskExpand));
