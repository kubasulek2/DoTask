import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SadIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
	root: {
		width: '100%',
		marginTop: 48,
		display: 'flex',
		justifyContent: 'center',
	},
	content: {
		alignItems: 'center',
		display: 'flex'
	},
	icon: {
		fontSize: 70,
		fontWeight: 'bold',
	},
	body: {
		fontSize: 20
	},
	'@media(max-width: 400px)': {
		body: {
			fontSize: 16
		},
		icon: {
			fontSize: 60,
		},
	}
}));
const NotFound = () => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<div className={classes.content}>
				<SadIcon className={classes.icon}  color='secondary'/>
				<Typography className={classes.body} color='textSecondary'>Oops! Haven't found.</Typography>
			</div>
		</div>
	);
};

export default NotFound;
