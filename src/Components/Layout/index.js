import React, { useState } from 'react';
import { Redirect, Switch, Route } from 'react-router';
import { DragDropContext } from 'react-beautiful-dnd';

import Header from './Header';
import Sidebar from './Sidebar';
import Main from './Main';
import Tasks from '../Tasks';
import FourOhFour from '../FourOhFour';
import isLoggedIn from '../../Utils/is_logged_in';


const Layout = ({ data, onDragEnd, logOut, setActive }) => {
	const [sideBarOpen, setSidebarOpen] = useState(false);
	const handleSidebar = () => setSidebarOpen(prev => !prev);
	if (!isLoggedIn()) {
		return <Redirect to='/login' />;
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Header handleSidebar={handleSidebar} logOut={logOut} />
			<Sidebar 
				open={sideBarOpen} 
				handleSidebar={handleSidebar} 
				tasks={data}
				setActive={setActive} 
			/>
			<Main open={sideBarOpen}>
				<Switch>
					<Route path='/tasks' render={(props) => <Tasks {...props}  tasks={data} />} />
					<Route path='/' exact render={() => <Redirect to='/tasks/all' />} />
					<Route path='/' component={FourOhFour} />
				</Switch>
			</Main>
		</DragDropContext>
	);
};

export default Layout;
