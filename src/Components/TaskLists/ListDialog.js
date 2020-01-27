import React, {forwardRef, useState} from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="down" ref={ref} {...props} />;
});

const EditList = ({ edit, location, history, match: { params: { params } } }) => {
	let listId;
	
	const [open, setOpen] = useState(true);
	const handleClose = () => {
		let loc = location.pathname;
		loc = loc.replace(/\/(?:newList|editList)/g, '');
		history.push(loc);
		setOpen(false);
		
	};
	
	if (edit) {
		const regex = /tasks\/(.+?)(?:\/|$)/;
		let match = params.match(regex);
		match = match ? match[1] : match;
		listId = match;
		console.log(listId);
	}
	return (
		<Dialog
			open={open}
			TransitionComponent={Transition}
			keepMounted
			onClose={handleClose}
		>
			<DialogTitle>{edit ? 'Edit' :'Create New'}  List</DialogTitle>
			<form action="">
				<DialogContent>
					<DialogContentText>
						Let Google help apps determine location. This means sending anonymous location data to
						Google, even when no apps are running.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Disagree
					</Button>
					<Button onClick={handleClose} color="primary">
						Agree
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};

export default EditList;
