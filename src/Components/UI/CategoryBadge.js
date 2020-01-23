import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(({ spacing, palette }) => ({
	root: {
		marginTop: spacing(1.5),
		padding: spacing(1),
		borderRadius: 4,
		background: palette.secondary.light
	}
}));

const CategoryBadge = ({text}) => {
	const classes = useStyles();
	
	return (
		<div className={classes.root}>
			<Typography variant='h5' color='textPrimary'>{text}</Typography>
		</div>
	);
};

export default CategoryBadge;

