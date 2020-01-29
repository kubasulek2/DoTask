import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import FourOhFour from '../../Components/FourOhFour';
import Edit from '../Forms/EditTask';


const styles = (theme => ({
	root: {
		width: '100%',
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
	container: {
		width: '80%',
		margin: 'auto',
	},
}));


class TaskExpand extends Component {
	render() {
		const { tasks, match: { params }, classes } = this.props;
		if (Object.values(tasks).length && !Object.values(tasks).some(t => t.id === params.taskId)) return <FourOhFour />;
		
		return (
			<div className={classes.root}>
				<Edit />
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
	editTask: dispatch({ type: 'ABC' })
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TaskExpand));
