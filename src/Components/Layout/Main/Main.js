import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({spacing, mixins }) => ({
	root: { 
		height: '100%',
		marginLeft: props => props.open ? 270 : 59,
		transition: 'margin-left .15s ease-out',
		padding: spacing(),
		paddingTop: spacing(2.5),
		overflowX : 'hidden',
	},
	toolbar: mixins.toolbar
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
