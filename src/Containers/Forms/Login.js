import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Lock from '@material-ui/icons/Lock';
import { Typography } from '@material-ui/core';

import Checkbox from '../../Components/Login/LoginCheckbox';

const xxs = '@media (max-width:400px)';
const styles = (({ palette, spacing }) => ({
	root: {
		position: 'relative',
		width: '100%'
	},
	errorMessage: {
		marginBottom: 8,
		minHeight: 35,
		fontSize: 12,
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
		marginTop: spacing(2),
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
		valid: false,
		touched: false,
		hint: 'Provide a valid email address.'
	},
	password: {
		value: '',
		rules: {
			regex: /^(?=.{8,20})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!*/\\[\]`~().,:;"']).*$/,
		},
		valid: false,
		touched: false,
		hint: 'Password must have 8 to 20 characters, contain at least one lower and uppercase letter, one digit and one special sign.'
	},
	confirmPassword: {
		value: '',
		rules: {
			identity: 'password',
		},
		valid: false,
		touched: false,
		hint: 'Passwords must match.'
	},
	valid: false,
	hint: '',
	persist: true
};

class LoginForm extends Component {
	state = initialState;
	emailRef = React.createRef();

	componentDidMount() {
		this.emailRef.current.focus();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.type !== this.props.type) {
			this.setState(initialState);
		}
	}

	handleInputChange(event, type) {
		let valid = this.props.type === 'signup' ? this.handleInputValidation(event.target.value, type) : true;
		this.setState({
			[type]: {
				...this.state[type],
				value: event.target.value,
				valid: valid,
				touched: false
			},
			hint: ''
		}, this.handleFormValidation);
	}

	handleInputValidation(value, type) {
		switch (Object.keys(this.state[type].rules)[0]) {
			case 'regex':
				return this.state[type].rules.regex.test(value);
			default:
				return this.state.password.value === value;

		}
	}

	handleFormValidation() {
		let keys = Object.keys(this.state).slice(0, 3),
			allValid;

		keys = this.props.type === 'login' ? keys.slice(0, -1) : keys;
		allValid = keys.every(key => this.state[key].valid === true);

		return this.setState({ valid: allValid });
	}

	handleInputFocus = type => {
		return this.setState({
			hint: this.state[type].hint,

		});
	}
	handleInputBlur = type => {
		return this.setState({
			[type]: {
				...this.state[type],
				touched: true
			},

		});
	}

	handleFormSubmit = event => {
		event.preventDefault();
		this.props.logIn(this.state.persist);
	}

	handleCheckbox = () => this.setState(({ persist }) => ({ persist: !persist }))

	render() {
		const { type, setType, classes } = this.props;
		const { email, password, confirmPassword, hint, valid, persist } = this.state;
		const message = type === 'login' ? 'Don\'t have an account? ' : 'Already have an account? ';

		return (
			<form className={classes.root} id='login-form' onSubmit={this.handleFormSubmit}>
				<Typography
					className={classes.errorMessage}
					color='primary'
					variant='subtitle2'
					align='center'
				>
					{hint}
				</Typography>
				<div className={classes.inputContainer}>
					<TextField
						className={classes.textField}
						inputRef={this.emailRef}
						value={email.value}
						error={!email.valid && email.touched}
						onChange={(event) => this.handleInputChange(event, 'email')}
						onBlur={type === 'signup' ? () => this.handleInputBlur('email') : null}
						onFocus={type === 'signup' ? () => this.handleInputFocus('email') : null}
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
						value={password.value}
						error={!password.valid && password.touched}
						onChange={(event) => this.handleInputChange(event, 'password')}
						onBlur={type === 'signup' ? () => this.handleInputBlur('password') : null}
						onFocus={type === 'signup' ? () => this.handleInputFocus('password') : null}
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
							value={confirmPassword.value}
							error={!confirmPassword.valid && confirmPassword.touched}
							onChange={(event) => this.handleInputChange(event, 'confirmPassword')}
							onBlur={type === 'signup' ? () => this.handleInputBlur('confirmPassword') : null}
							onFocus={type === 'signup' ? () => this.handleInputFocus('confirmPassword') : null}
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
					<Checkbox persist={persist} handleCheckbox={this.handleCheckbox} styles={classes.checkbox} />
					<Button
						disabled={!valid}
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
