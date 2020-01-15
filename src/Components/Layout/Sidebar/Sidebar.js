import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import ExpandedDrawer from './ExpandedDrawer';
import SmallDrawer from './SmallDrawer';


const useStyles = makeStyles(({ mixins, palette, spacing, shadows }) => ({
	drawer: {
		position: 'fixed',
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
			{props.open ? <ExpandedDrawer handleSidebar={props.handleSidebar} /> : <SmallDrawer handleSidebar={props.handleSidebar} />}
		</Drawer>);
}

export default Sidebar;
