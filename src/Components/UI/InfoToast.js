import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

import * as actions from '../../Store/Actions';


const useStyles = makeStyles(({ spacing, palette }) => ({
	toast: {
		background: palette.primary.dark,
		color: palette.text.white,
		fontWeight: 'bold',

	},
	close: {
		padding: spacing(0.5),
		color: palette.text.white
	},
}));


/* Component displays toast with chat notifications. */
const InfoToast = props => {
	const { message, clearInfoToast } = props;
	const classes = useStyles();

	return (
		<Snackbar
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
			}}
			TransitionComponent={Slide}
			className={classes.root}
			open={!!message}
			autoHideDuration={2500}
			onClose={clearInfoToast}
			message={message}
			ContentProps={{
				classes: {
					root: classes.toast,
				}
			}}
			action={[
				<IconButton
					key="close"
					aria-label="close"
					color="inherit"
					className={classes.close}
					onClick={clearInfoToast}
				>
					<CloseIcon />
				</IconButton>,
			]}
		/>
	);
};


const mapDispatchToProps = dispatch => ({
	clearInfoToast: () => dispatch(actions.clearInfoToast()),
});

export default connect(null, mapDispatchToProps)(InfoToast);
