import React, { useState } from 'react';
import { Redirect, Switch, Route } from 'react-router';
import { DragDropContext } from 'react-beautiful-dnd';

import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Main from './Main/Main';
import CreateTask from '../Tasks/CreateTask';
import Tasks from '../Tasks/Tasks/Tasks';
import FourOhFour from '../FourOhFour';
import isLoggedIn from '../../Utils/is_logged_in';


const Layout = ({ data, setCategory, onDragEnd, logOut }) => {
	const [sideBarOpen, setSidebarOpen] = useState(false);
	const handleSidebar = () => setSidebarOpen(prev => !prev);
	if (!isLoggedIn()) {
		return <Redirect to='/login' />;
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Header handleSidebar={handleSidebar} logOut={logOut} />
			<Sidebar open={sideBarOpen} handleSidebar={handleSidebar} tasks={data} setCategory={setCategory} />
			<Main open={sideBarOpen}>
				<Switch>
					<Route path='/tasks' render={() => <Tasks tasks={data} />} />
					<Route path='/' exact render={() => <Redirect to='/tasks/all' />} />
					<Route path='/' component={FourOhFour} />
				</Switch>
			</Main>
		</DragDropContext>
	);
};

export default Layout;
