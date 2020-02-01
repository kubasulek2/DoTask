import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(({ palette, spacing }) => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	formControl: {
		margin: spacing(1),
		minWidth: 120,
	},
	title: {
		color: palette.secondary.dark,
		fontSize: 24,
		//textTransform: 'uppercase',
		'& h2': {
			fontWeight: 'bold',
		}
	},
	cancel: {
		color: palette.error.light
	}
}));

const NotificationDialog = ({ open, handleClose, handleNotification, value }) => {
	const classes = useStyles();
	const [unit, setUnit] = useState(value ? value.unit : 0);
	const [number, setNumber] = useState(value ? value.number : 0);

	const handleUnitChange = event => setUnit(Number(event.target.value));
	const handleNumberChange = event => {
		if (Number(event.target.value) > 10) return setNumber(10);
		if (Number(event.target.value) < 0) return setNumber(0);
		setNumber(+event.target.value);
	};
	return (
		<div>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle className={classes.title}>Set email remainder</DialogTitle>
				<DialogContent>
					<form className={classes.container}>
						<FormControl className={classes.formControl}>
							<InputLabel>Unit</InputLabel>
							<Select
								value={unit}
								onChange={handleUnitChange}
								input={<Input />}
							>
								<MenuItem value={0}>Hours</MenuItem>
								<MenuItem value={1}>Days</MenuItem>
								<MenuItem value={2}>Weeks</MenuItem>
							</Select>
						</FormControl>
						<FormControl className={classes.formControl}>
							<InputLabel>Amount 1 to 10</InputLabel>
							<Input
								type="number"
								placeholder='1-10'
								inputProps={{
									min: 0,
									max: 10
								}}
								value={number}
								onChange={handleNumberChange}
							/>
						</FormControl>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} className={classes.cancel}>
						Cancel
					</Button>
					<Button onClick={() => handleNotification({unit, number})} disabled={number ? false: true} color="primary">
						Ok
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};
export default NotificationDialog;