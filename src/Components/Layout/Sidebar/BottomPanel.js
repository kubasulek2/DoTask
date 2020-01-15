import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';


const useStyles = makeStyles(({ spacing }) => ({
	root: {
		position: 'absolute',
		bottom: 0,
		width: 240,
	},
	list: {

	}, display: 'flex',
	alignItems: 'center',
 
	listItem: {
		padding: spacing(.5)
	}

}));

const BottomPanel = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<List className={classes.list}>
				<Divider />
				<ListItem className={classes.listItem}>
					<IconButton className={classes.searchButton} color='secondary'>
						<AddIcon />
					</IconButton>
					<ListItemText primary='Create List' />
				</ListItem>
			</List>
		</div>
	);
}

export default BottomPanel;
