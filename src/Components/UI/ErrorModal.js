import React, { forwardRef } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';


const useStyles = makeStyles(({ palette, shadows }) => ({
	paper: {
		width: 350,
		maxWidth: '98%',
		backgroundColor: palette.background.paper,
		border: 'none',
		boxShadow: shadows[0],
	},
	bold: {
		fontSize: 24,
		fontWeight: 'bold',
		color: palette.error.dark
	},
	error: {
		fontSize: 20,
		fontWeight: 'bold',
		color: palette.text.primary
	},
	info: {
		//fontWeight: 'bold',
	}
}));


/* eslint-disable react/display-name */

/* Create Transition component with ref forwarded. */
const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} unmountOnExit {...props} />;
});
/* eslint-enable react/display-name */


/* Modal showing up when error state is set to true.  */
const ErrorModal = ({ error, cancelError, reconnect }) => {
	const classes = useStyles();


	/* Handle cancel error and close modal. */
	const handleClose = () => {
		cancelError();
	};

	const open = !!error;

	return (
		<Dialog
			className={classes.root}
			TransitionComponent={Transition}
			open={open}
			onClose={handleClose}
			closeAfterTransition
			PaperProps={{
				classes: {
					root: classes.paper
				}
			}}
		>
			<DialogTitle><span className={classes.bold}>Ups! </span><span className={classes.error}>{error}</span></DialogTitle>
			<DialogContent>
				<DialogContentText color='textSecondary' className={classes.info} >
					Something Went Wrong...
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={reconnect} color="primary">
					Try Again
				</Button>
				<Button onClick={handleClose} color="default">
					Cancel
				</Button>
			</DialogActions>
		</Dialog>

	);
};

export default ErrorModal;

