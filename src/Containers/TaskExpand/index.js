import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/StarOutlined';
import StarBorderIcon from '@material-ui/icons/StarBorderOutlined';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';

import FourOhFour from '../../Components/FourOhFour';
import * as actions from '../../Store/Actions';


const styles = ({ palette }) => ({
	root: {
		width: '100%',
		paddingTop: 24
	},
	card: {
		maxWidth: 600,
		width: '80%',
		minWidth: 280,
		margin: 'auto',
	},
	editButton: {
		color: palette.error.light
	}
});


class TaskExpand extends Component {
	state = {}

	handleFavorite = () => {
		const { match: { params } } = this.props;
		this.props.setTaskFavorite(params.taskId);
	};


	render() {
		const { tasks, match: { params }, classes } = this.props;

		if (Object.values(tasks).length && !Object.values(tasks).some(t => t.id === params.taskId)) return <FourOhFour />;
		
		const { favorite, content, deadline, createdAt, note, subtasks, notification, files } = tasks[params.taskId];

		return (
			<div className={classes.root}>
				<Card className={classes.card}>
					<CardHeader
						action={
							<IconButton color='secondary' onClick={this.handleFavorite}>
								{favorite ? <StarIcon /> : <StarBorderIcon />}
							</IconButton>
						}
						title={content}
					/>
					<CardContent>
					</CardContent>
					<CardActions>
						<Button variant='contained' color='primary' size='large'>Cancel</Button>
					</CardActions>
				</Card>
			</div>
		);
	}
}

const mapStateToProps = ({ tasks, app }) => ({
	tasks: tasks.tasks,
	loading: app.loading,
	error: app.error,
	cb: app.cb,
	confirm: app.confirm
});

const mapDispatchToProps = dispatch => ({
	editTask: () => dispatch({ type: 'ABC' }),
	setTaskFavorite: taskId => dispatch(actions.setTaskFavorite(taskId))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TaskExpand));
