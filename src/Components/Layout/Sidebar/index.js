import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import ExpandedDrawer from './ExpandedDrawer';
import SmallDrawer from './SmallDrawer';
import BottomPanel from './BottomPanel';


const useStyles = makeStyles(({ mixins, palette }) => ({
	drawer: {
		position: 'fixed',
		zIndex: 2,
		flexShrink: 0,
		backgroundColor: palette.secondary.light,
		width: props => props.open ? 270 : 59,
	},
	drawerPaper: {
		overflowX: 'hidden',
		transition: 'width .15s ease-out',
		width: props => props.open ? 270 : 59,
		flexDirection: 'column',
	},
	toolbar: mixins.toolbar,
	bottomPanel: {
		position: 'fixed',
		bottom: 0,
		width: '100%',
		height: 64,
		display: 'flex',
		alignItems: 'center',
	}
}));

const Sidebar = props => {
	const classes = useStyles(props);
	const [searchFocus, setSearchFocus] = useState(false);

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
			{props.open 
				? <ExpandedDrawer 
					tasks={props.tasks} 
					setCategory={props.setCategory} 
					searchFocus={searchFocus}	
					setSearchFocus={setSearchFocus}	
				/> 
				: <SmallDrawer 
					handleSidebar={props.handleSidebar} 
					setSearchFocus={setSearchFocus}
				/>
			}
			{<BottomPanel width={239} open={props.open} />}
		</Drawer>);
}

export default Sidebar;
