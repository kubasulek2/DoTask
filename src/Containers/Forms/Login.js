import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Lock from '@material-ui/icons/Lock';
import { Typography } from '@material-ui/core';

const xxs = '@media (max-width:400px)';
const styles = (({ palette, spacing }) => ({
	root: {
		position: 'relative',
		width: '100%'
	},
	errorMessage: {
		margin: 8
	},
	inputContainer: {
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap',
		width: '100%'
	},
	textField: {
		width: '80%',
		padding: 0,
		marginBottom: spacing(1.2),
		'& .MuiInputBase-input': {
			paddingTop: 12,
			paddingBottom: 12,
		},
		'& .MuiInputBase-root': {
			paddingLeft: 8
		},
		[xxs]: {
			width: '100%'
		}
	},
	loginIcon: {
		color: palette.secondary.dark
	},
	button: {
		marginTop: spacing(1),
		marginBottom: spacing(1.5),
		width: '80%',
		borderRadius: 4,
		fontSize: 20,
		color: palette.grey[300],
		textTransform: 'capitalize',
		[xxs]: {
			width: '100%'
		}
	},
	link: {
		color: palette.secondary.main,
		cursor: 'pointer',
		fontWeight: 'bold',
	},
	border: { borderRadius: 4 },
}));

/* eslint-disable no-control-regex */
const initialState = {
	email: {
		value: '',
		rules: {
			regex: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
		},
		valid: false
	},
	password: {
		value: '',
		rules: {
			regex: /^(?=.{8,20})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!*/\\[\]`~().,:;"']).*$/,
		},
		valid: false
	},
	confirmPassword: {
		value: '',
		rules: {
			identity: 'password',
		},
		valid: false
	},
	valid: false
};

class LoginForm extends Component {
	state = initialState;
	emailRef = React.createRef();

	componentDidMount() {
		this.emailRef.current.focus();
	}
	componentDidUpdate(prevProps) {
		if (prevProps.type !== this.props.type) {
			this.emailRef.current.focus();
			this.setState(initialState);
		}
	}
	handleInputChange(event, type) {
		this.setState({
			[type]: {
				...this.state[type],
				value: event.target.value
			}
		});
	}
	handleInputValidation(event, type) {
		let validInput = false;
		switch (Object.keys(this.state[type].rules)[0]) {
			case 'regex':
				validInput = this.state[type].rules.regex.test(event.target.value);
				break;

			default:
				validInput = event.target.value === this.state.password.value;
				break;
		}

		return this.setState({
			[type]: {
				...this.state[type],
				valid: validInput
			}
		}, this.handleFormValidation);
	}
	handleFormValidation() {
		let keys = Object.keys(this.state).slice(0, -1);
		keys = this.props.type === 'login' ? keys.slice(0, -1) : keys;
		return this.setState({valid: keys.every(key => this.state[key].valid === true)});
	}

	render() {
		const { type, setType, classes } = this.props;
		const message = type === 'login' ? 'Don\'t have an account? ' : 'Already have an account? ';

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
						inputRef={this.emailRef}
						value={this.state.email.value}
						onChange={(event) => this.handleInputChange(event, 'email')}
						onBlur={(event) => this.handleInputValidation(event, 'email')}
						placeholder="Email"
						variant="outlined"
						type='email'
						InputProps={{
							startAdornment: (
								<InputAdornment
									position="start"
								>
									<AccountCircle
										className={classes.loginIcon}
										fontSize='default'
									/>
								</InputAdornment>
							),
							classes: { root: classes.border }
						}}
					/>
					<TextField
						className={classes.textField}
						value={this.state.password.value}
						onChange={(event) => this.handleInputChange(event, 'password')}
						onBlur={(event) => this.handleInputValidation(event, 'password')}
						placeholder="Password"
						variant="outlined"
						type='password'
						InputProps={{
							startAdornment: (
								<InputAdornment
									position="start"
								>
									<Lock
										className={classes.loginIcon}
										fontSize='default'
									/>
								</InputAdornment>
							),
							classes: { root: classes.border }
						}}
					/>
					{type === 'signup'
						? <TextField
							className={classes.textField}
							value={this.state.confirmPassword.value}
							onChange={(event) => this.handleInputChange(event, 'confirmPassword')}
							onBlur={(event) => this.handleInputValidation(event, 'confirmPassword')}
							placeholder="Confirm password"
							variant="outlined"
							type='password'
							InputProps={{
								startAdornment: (
									<InputAdornment
										position="start"
									>
										<Lock
											className={classes.loginIcon}
											fontSize='default'
										/>
									</InputAdornment>
								),
								classes: { root: classes.border }
							}}
						/>
						: null}
					<Button
						disabled={!this.state.valid}
						form={'login-form'}
						type='submit'
						variant='contained'
						color='primary'
						className={classes.button}
					>
						{type}
					</Button>
				</div>
				<Typography variant='body2' align='center'>
					{message}
					<span className={classes.link} onClick={setType}>
						{type === 'login' ? 'Sign up' : 'Log in'}
					</span>
				</Typography>
			</form>
		);
	}


}

export default withStyles(styles)(LoginForm);
