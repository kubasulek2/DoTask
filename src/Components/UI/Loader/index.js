import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import styles from './Loader.module.css';

const useStyles = makeStyles(() => ({
	root: {
		position: 'absolute',
		zIndex: 1000,
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	spinner: {
		'& div': {
			backgroundColor: props => props.color,
			opacity: .8
		}
	}
}));

const Loader = (props) => {
	const classes = useStyles(props);

	return (
		<div className={classes.root}>
			<div className={[classes.spinner, styles.spinner].join(' ')}>
				<div className={styles.bounce1}></div>
				<div className={styles.bounce2}></div>
				<div className={styles.bounce3}></div>
			</div>
		</div>
	);
};

export default Loader;
