import React, { forwardRef } from 'react';
import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';



/* eslint-disable react/display-name */
/* Create Transition Component with ref forwarded */
const Transition = forwardRef(function Transition (props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const useStyles = makeStyles(({ palette }) => ({
	confirm: {
		color: palette.error.light
	},
	bold: {
		fontWeight: 'bold',
	}
}));

/* Confirmation dialog that pops up when attempt to ignore user. */
const IgnoreDialog = ({ confirm, cancel, history }) => {
	const classes = useStyles();

	const handleClose = () => {
		cancel();
	};

	/* Confirm ignore */
	const handleConfirm = () => {
		confirm();
		history.push('/tasks/all');
	};


	return (
		<Dialog
			open={true}
			TransitionComponent={Transition}
			keepMounted
			onClose={handleClose}
		>
			<DialogTitle><span className={classes.bold}>Are you sure?</span></DialogTitle>
			<DialogContent>
				<DialogContentText className={classes.bold}>
					This action is irreversible.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					cancel
				</Button>
				<Button onClick={handleConfirm} className={classes.confirm}>
					Ok
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default withRouter(IgnoreDialog);