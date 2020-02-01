import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ClearIcon from '@material-ui/icons/Clear';


import bellSound from '../../Assets/bell.mp3';

const sound = new Audio(bellSound);

const useStyles = makeStyles(({ palette, spacing }) => ({
	root: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 0,
		paddingLeft: 48,
		'& .MuiListItemText-primary': {
			color: palette.primary.light,
		}
	},
	clear: {
		paddingLeft: spacing(.5),
		color: palette.error.light,
		cursor: 'pointer',
		'& svg': {
			display: 'block',
			padding: 3
		}
	},
	clearPlaceholder: {
		width: 45,
		height: 45
	},
	'@media (max-width: 450px)':{
		root: {
			'& .MuiListItemText-primary': {
				fontSize: 14
			}	
		},
		clear: {
			paddingLeft: 0,
		}
	}

}));


const FileLink = ({ text, url, handleDelete }) => {
	const classes = useStyles();
	const deleteFile = () => {
		sound.pause();
		sound.currentTime = 0;
		sound.play();
		handleDelete();
	};
	return (
		<ListItem className={classes.root}>
			<a href={url} target='_blank' rel='noopener noreferrer'>
				<ListItemText
					primary={text}
				/>
			</a>
			<div className={classes.clear} onClick={deleteFile}>
				<ClearIcon />
			</div>
		</ListItem>
	);
};
export default FileLink;