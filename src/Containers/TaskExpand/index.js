import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

import FourOhFour from '../../Components/FourOhFour';
import Edit from '../Forms/EditTask';
import * as actions from '../../Store/Actions';


const styles = {
	root: {
		width: '100%',
	},
};


class TaskExpand extends Component {
	componentDidMount() {
		const { fetchTask, match: { params }, task } = this.props;
		// Important, prevents request loop.
		if(!task){	
			fetchTask(params.taskId);
		}
	}


	render() {
		const { tasks, task, match: { params }, classes } = this.props;
		if (Object.values(tasks).length && !Object.values(tasks).some(t => t.id === params.taskId)) return <FourOhFour />;

		return (
			<div className={classes.root}>
				<Edit task={task}/>
			</div>
		);
	}
}

const mapStateToProps = ({ tasks, app }) => ({
	task: tasks.task,
	tasks: tasks.tasks,
	loading: app.loading,
	error: app.error,
	cb: app.cb,
	confirm: app.confirm
});

const mapDispatchToProps = dispatch => ({
	editTask: () => dispatch({ type: 'ABC' }),
	fetchTask: taskId => dispatch(actions.fetchTask(taskId))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TaskExpand));
