import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SadIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
	root: {
		width: '100%',
		marginTop: 24,
		display: 'flex',
		justifyContent: 'center',
	},
	content: {
		alignItems: 'center',
		display: 'flex'
	},
	icon: {
		fontSize: 60,
		fontWeight: 'bold',
	}
}));
const NotFound = () => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<div className={classes.content}>
				<SadIcon className={classes.icon}  color='secondary'/>
				<Typography variant='body1' color='textSecondary'>Oops! Haven't found.</Typography>
			</div>
		</div>
	);
};

export default NotFound;
