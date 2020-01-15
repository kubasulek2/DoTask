import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';


const useStyles = makeStyles(({ mixins, palette, spacing, shadows }) => ({
	drawer: {
		flexShrink: 0,
		backgroundColor: palette.secondary.light
	},
	drawerPaper: {
		transition: 'width .15s ease-out',
		width: props => props.open ? 240 : 59,
		overflowX: 'hidden',
	},
	toolbar: mixins.toolbar,
		
}));

const Sidebar = props => {
	const classes = useStyles(props);

	const list = (
		<div></div>
	);
	return (
		<Drawer
			className={classes.drawer}
			variant='permanent'
			classes={{
				paper: classes.drawerPaper,
			}}
			anchor='left'
		>
			<div className={classes.toolbar} />
		</Drawer>);
}

export default Sidebar;
