import React from 'react';
import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import ListItemIcon from '@material-ui/core/ListItemIcon';


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

const BottomPanel = ({open, location,history,}) => {
	const classes = useStyles();
	
	const handleClick = () => history.push(location.pathname + '/newList');
	
	const icon = (
		open
			? <ListItemIcon className={classes.add} color='default'>
				<AddIcon />
			</ListItemIcon>
			: <Tooltip
				title='add task'
				placement='top'
				arrow classes={{ popper: classes.tooltip }}>
				<ListItemIcon className={classes.add} color='default' >
					<AddIcon />
				</ListItemIcon>
			</Tooltip>
	);


	return (
		<div className={classes.root} onClick={handleClick}>
			<Divider />
			<List className={classes.list}>
				<ListItem className={classes.listItem} button>
					{icon}
					<ListItemText primary='Create List' classes={{primary: classes.text}}/>
				</ListItem>
			</List>
		</div>
	);
};

export default withRouter(BottomPanel);
