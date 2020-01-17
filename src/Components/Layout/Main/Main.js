import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({spacing, mixins }) => ({
	root: { 
		height: '100%',
		marginLeft: 59,
		padding: spacing(),
		paddingTop: spacing(2.5)
	},
	toolbar: mixins.toolbar
}));
const Main = ({ children }) => {
	const classes = useStyles();
	return (
		<main className={classes.root}>
			<div className={classes.toolbar} />
			{children}
		</main>
	);
};

export default Main;
