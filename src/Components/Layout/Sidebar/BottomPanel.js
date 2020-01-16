import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';


const useStyles = makeStyles(({ spacing, palette }) => ({
	root: {
		position: 'fixed',
		zIndex: 5,
		bottom: 0,
		width: props => props.width,
	},
	list: {
		background: palette.primary.light,
		padding: 0,
	},
	listItem: {
		padding: spacing(.5)
	},
	addButton: {
		marginRight: 5
	}

}));

const BottomPanel = (props) => {
	const classes = useStyles(props);

	return (
		<div className={classes.root}>
			<Divider />
			<List className={classes.list}>
				<ListItem className={classes.listItem}>
					<IconButton className={classes.addButton} color='default'>
						<AddIcon />
					</IconButton>
					<ListItemText primary='Create List' />
				</ListItem>
			</List>
		</div>
	);
}

export default BottomPanel;
