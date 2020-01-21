import React, { Component } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Typography } from '@material-ui/core';

const styles = (({ palette, spacing }) => ({
	root: { position: 'relative' },
	errorMessage: {
		margin: 8
	},
	inputContainer: {
		marginBottom: spacing(1.5)
	},
	textField: {
		width: '100%',
		padding: 0,
		'& .MuiInputBase-input': {
			paddingTop: 14,
			paddingBottom: 14,
		},
		'& .MuiInputBase-root': {
			paddingLeft: 8
		}
	},
	loginIcon: {
		color: palette.primary.main
	},
	button: {
		width: '100%',
		borderRadius: 4,
		fontSize: 20,
		color: palette.grey[300],
		textTransform: 'capitalize'
	},
	border: { borderRadius: 4 },
}));


class LoginForm extends Component {
	render() {
		const { classes } = this.props;


		return (
			<form className={classes.root} id='login-form'>
				<Typography
					className={classes.errorMessage}
					color='error'
					variant='subtitle2'
					align='center'
				>
				</Typography>
				<div className={classes.inputContainer}>
					<TextField
						className={classes.textField}
						placeholder="User name"
						variant="outlined"
						InputProps={{
							startAdornment: (
								<InputAdornment
									position="start"
								>
									<AccountCircle
										className={classes.loginIcon}
										fontSize='large'
									/>
								</InputAdornment>
							),
							classes: { root: classes.border }
						}}
					/>
				</div>
				<Button
					form={'login-form'}
					type='submit'
					variant='contained'
					color='secondary'
					className={classes.button}
				>
					continue
				</Button>
			</form>
		);
	}


}

export default withStyles(styles)(LoginForm);
