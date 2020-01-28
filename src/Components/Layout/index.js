import React, { useState, useEffect } from 'react';
import { Redirect, Switch, Route } from 'react-router';

import { makeStyles } from '@material-ui/core';

import Header from './Header';
import Sidebar from './Sidebar';
import Main from './Main';
import Tasks from '../Tasks';
import FourOhFour from '../FourOhFour';
import ListDialog from '../TaskLists/ListDialog';

const useStyles = makeStyles(() => ({
	root: {
		width: '100vw',
	}
}));
export const Layout = () => {
	const classes = useStyles();
	const [sideBarOpen, setSidebarOpen] = useState(false);

	useEffect(() => {
		const open = sessionStorage.getItem('sidebarOpen');
		if (open) setSidebarOpen(true);
	}, []);

	const handleSidebar = () => {
		!sideBarOpen ? sessionStorage.setItem('sidebarOpen', true) : sessionStorage.removeItem('sidebarOpen');
		setSidebarOpen(prev => !prev);
	};


	return (
		<div className={classes.root}>
			<Header handleSidebar={handleSidebar} />
			<Sidebar
				open={sideBarOpen}
				handleSidebar={handleSidebar}
			/>
			<Main open={sideBarOpen}>
				<Route path='/:params*/newList' render={props => <ListDialog {...props} />} />
				<Route path='/:params*/editList' render={props => <ListDialog {...props} edit />} />
				<Switch>
					<Route path='/tasks' render={(props) => <Tasks {...props} />} />
					<Route path='/' exact render={() => <Redirect to='/tasks/all' />} />
					<Route path='/' component={FourOhFour} />
				</Switch>
			</Main>
		</div>
	);
};


export default Layout;
