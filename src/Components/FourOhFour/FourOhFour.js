import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(({ palette }) => ({
	root: {
		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	content: { display: 'flex' }
}));
const FourOhFour = () => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<div className={classes.content}>
				<Typography variant='h1' style={{fontWeight: 'bold'}} color='textPrimary'>404</Typography>
				<Typography variant='h6' color='textSecondary'>404</Typography>
			</div>
		</div>
	);
}

export default FourOhFour;
