import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

const styles = ({ palette, breakpoints, spacing }) => ({
	root: {
		background: palette.grey[100],
		borderRadius: spacing(.5),
		width: '100%',
		marginTop: spacing(2),
		marginBottom: spacing(3),
		minHeight: 45,
	},
	paper: {
		top: '64px !important',
		[breakpoints.down('xs')]: {
			top: '59px !important',
		}
	},
	list: {
		padding: 4
	},
	listItem: {
		fontSize: 15,
		color: palette.text.secondary
	}
});

class CreateTask extends Component {
	state = {
		value: '',
		deadline: '',
		notification: ''
	}

	handleSubmit = event => {
		event.preventDefault();	
	}
	
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<form onSubmit={this.handleSubmit}></form>
			</div>
		);
	}
}

export default withStyles(styles)(CreateTask);
