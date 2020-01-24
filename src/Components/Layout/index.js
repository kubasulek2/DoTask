import React, { useState, Fragment } from 'react';
import { Redirect, Switch, Route } from 'react-router';

import Header from './Header';
import Sidebar from './Sidebar';
import Main from './Main';
import Tasks from '../Tasks';
import FourOhFour from '../FourOhFour';
import isLoggedIn from '../../Utils/is_logged_in';


const Layout = () => {
	const [sideBarOpen, setSidebarOpen] = useState(false);
	const handleSidebar = () => setSidebarOpen(prev => !prev);
	if (!isLoggedIn()) {
		return <Redirect to='/login' />;
	}

	return (
		<Fragment>
			<Header handleSidebar={handleSidebar} />
			<Sidebar 
				open={sideBarOpen} 
				handleSidebar={handleSidebar} 
			/>
			<Main open={sideBarOpen}>
				<Switch>
					<Route path='/tasks' render={(props) => <Tasks {...props} />} />
					<Route path='/' exact render={() => <Redirect to='/tasks/all' />} />
					<Route path='/' component={FourOhFour} />
				</Switch>
			</Main>
		</Fragment>
	);
};

export default Layout;
