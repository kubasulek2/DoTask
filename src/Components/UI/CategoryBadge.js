import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(({ spacing, palette }) => ({
	root: {
		marginBottom: spacing(1.5),
		display: 'flex',
		justifyContent: 'center',
	},
	badge: {
		background: palette.secondary.light,
		cursor: 'pointer',
		borderRadius: 4,
		padding: `${spacing(1)}px ${spacing(2.5)}px`,
		color: palette.background.paper, 
	}
}));

const CategoryBadge = ({ text, handleClick }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<div className={classes.badge} onClick={handleClick}>
				<Typography variant='body1' align='center'>{text}</Typography>
			</div>
		</div>
	);
};

export default CategoryBadge;

