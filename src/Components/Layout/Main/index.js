import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing, mixins, breakpoints }) => ({
	root: {
		position: 'relative',
		height: '100vh',
		overflowY: 'auto',
		marginLeft: props => props.open ? 270 : 59,
		transition: 'margin-left .15s ease-out',
		padding: spacing(.4),
		paddingTop: spacing(2.5),
		paddingBottom: spacing(1.5),
		minWidth: 250,
		[breakpoints.up('sm')]: {
			paddingLeft: spacing(),
			paddingRight: spacing(),
		},
		[breakpoints.up('lg')]: {
			paddingLeft: spacing(4),
			paddingRight: spacing(4),
		}
	},
	toolbar: {
		...mixins.toolbar,
		maxWidth: 260
	}
}));
const Main = (props) => {
	const classes = useStyles(props);
	return (
		<main className={classes.root}>
			<div className={classes.toolbar} />
			{props.children}
		</main>
	);
};

export default Main;
