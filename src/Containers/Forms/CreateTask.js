import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';

const styles = ({ palette, breakpoints, spacing }) => ({
	root: {
		background: palette.grey[200],
		borderRadius: spacing(.5),
		width: '100%',
		marginTop: spacing(2),
		marginBottom: spacing(3),
		minHeight: 45,
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
		borderRadius: spacing(.5),	
		background: palette.grey[200],
		fontSize: 20,
		padding: 12,
		border: 'none',
		color: palette.text.secondary,
		'&::placeholder': {
			color: palette.grey[400]
		},
		'&:focus': {
			outline: 'none'
		},
	},
	actions: {
		flexGrow: 0
	}
});

class CreateTask extends Component {
	state = {
		value: '',
		deadline: '',
		notification: '',
		focused: false
	}

	handleSubmit = event => {
		event.preventDefault();
	}

	handleChange = event => this.setState({ value: event.target.value })

	render() {
		const { classes, edit } = this.props;
		const { value, focused } = this.state;

		return (
			<div className={classes.root}>
				<form onSubmit={this.handleSubmit} className={classes.form}>
					<div className={classes.main}>
						<input
							type='text'
							placeholder='Add a task'
							className={classes.input}
							value={value}
							onChange={this.handleChange}
							onFocus={() => this.setState({ focused: true })}
							onBlur={() => this.setState({ focused: false })}
						/>
					</div>
					<div className={classes.actions}>

					</div>
				</form>
			</div>
		);
	}
}

export default withStyles(styles)(CreateTask);
