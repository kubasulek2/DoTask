import React from 'react';
import Helmet from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
	root: {
		width: '100%',
		height: '80vh',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	content: {
		alignItems: 'flex-end',
		display: 'flex'
	},
	secondary: {
		marginBottom: 12,
		marginLeft: 6
	},
	'@media(max-width: 400px)': {
		primary: {
			fontSize: 55
		}
	}
}));
const FourOhFour = () => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Helmet><title>DoTask | 404</title></Helmet>
			<div className={classes.content}>
				<Typography variant='h1' style={{ fontWeight: 'bold' }} color='textPrimary' className={classes.primary}>404</Typography>
				<Typography variant='h6' color='textSecondary' className={classes.secondary} >Page not found.</Typography>
			</div>
		</div>
	);
};

export default FourOhFour;
