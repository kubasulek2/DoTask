import React, { forwardRef, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';


import ListForm from '../../Containers/Forms/List';


const useStyles = makeStyles(({ breakpoints, palette }) => ({
	root: {
		minWidth: 300,
		[breakpoints.up('sm')]: {
			minWidth: 400
		}
	},
	title: {
		'& .MuiTypography-root': {
			textAlign: 'center',
			fontWeight: 'bold',
			color: palette.secondary.dark,
			fontSize: 22
		}
	},
}));


const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="down" ref={ref} {...props} />;
});

const EditList = ({ edit, location, history, match: { params: { params } } }) => {
	const classes = useStyles();
	const [open, setOpen] = useState(true);
	let listId;

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
	}
	return (
		<Dialog
			PaperProps={{
				classes: {
					root: classes.root 
				}
			}}
			open={open}
			TransitionComponent={Transition}
			onClose={handleClose}
		>
			<DialogTitle className={classes.title}>{edit ? 'Edit' : 'Create New'}  List</DialogTitle>
			{open ?<ListForm handleClose={handleClose} edit={edit} listId={listId} /> : null}
		</Dialog>
	);
};

export default EditList;
