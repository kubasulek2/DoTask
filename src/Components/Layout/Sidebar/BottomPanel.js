import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import AddIcon from '@material-ui/icons/Add';
import { ListItemIcon } from '@material-ui/core';


const useStyles = makeStyles(({ spacing, palette }) => ({
	root: {
		position: 'absolute',
		bottom: 0,
		width: 269,
	},
	list: {
		background: palette.primary.light,
		padding: 0,
	},
	listItem: {
		padding: spacing(.5),
	},
	text:{
		color: palette.background.paper,
		fontWeight: 'bold'
	},
	add: {
		padding: spacing(1.5),
		marginRight: 5,
		color: palette.background.paper,
	}

}));

const BottomPanel = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Divider />
			<List className={classes.list}>
				<ListItem className={classes.listItem} button>
					<ListItemIcon className={classes.add} color='default'>
						<AddIcon />
					</ListItemIcon>
					<ListItemText primary='Create List' classes={{primary: classes.text}}/>
				</ListItem>
			</List>
		</div>
	);
}

export default BottomPanel;
