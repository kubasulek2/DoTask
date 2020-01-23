import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

const xxs = '@media (max-width:400px)';
const useStyles = makeStyles(()=> ({
	content: {
		width: '80%',
		display: 'flex',
		alignItems: 'center',
		[xxs]: {
			width: '100%'
		},
		'& .MuiButtonBase-root': {
			padding: '0 5px 0 0'
		}
	}
}));

const LoginCheckbox = ({ persist, handleCheckbox}) => {
	const classes = useStyles();
	return (
		<div className={classes.content}>
			<Checkbox
				checked={persist}
				onChange={handleCheckbox}
				value="secondary"
				color="primary"
			/>
			<Typography color='textSecondary' variant='body2'>Keep me logged in</Typography>
		</div>
	);
};

export default LoginCheckbox;
