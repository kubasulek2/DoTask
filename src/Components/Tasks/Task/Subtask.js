import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

import bellSound from '../../../Assets/bell.mp3';

const sound = new Audio(bellSound);

const useStyles = makeStyles(({ palette }) => ({
	root: {
		display: 'flex',
		alignItems: 'center',
		padding: 0,
		paddingLeft: 46,
		'& .MuiListItemText-primary': {
			color: palette.text.secondary,
		}
	},
	checkbox: {
		padding: 0,
		marginRight: 12,
		color: palette.primary.light,

	}

}));


const Subtask = ({ text, handleDelete }) => {
	const classes = useStyles();
	const [checked, setChecked] = useState(false);

	const handleCheck = () => {
		sound.pause();
		sound.currentTime = 0;
		sound.play();
		setChecked(false);
		handleDelete();
	};

	return (
		<ListItem className={classes.root}>
			<Checkbox
				size='small'
				className={classes.checkbox}
				disableRipple
				checked={checked}
				onChange={handleCheck}
				value="primary"
			/>
			<ListItemText
				primary={text}
			/>
		</ListItem>
	);
};
export default Subtask;