import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { DragDropContext } from 'react-beautiful-dnd';

import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Main from './Main/Main';
import CreateTask from '../Tasks/CreateTask';
import Tasks from '../Tasks/Tasks/Tasks';


const Layout = ({ data, setCategory, onDragEnd, logOut }) => {
	const [sideBarOpen, setSidebarOpen] = useState(false);
	const handleSidebar = () => setSidebarOpen(prev => !prev);
	const { isAuth } = data;
	
	if (!isAuth) {
		return <Redirect to='/login'/>;
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Header handleSidebar={handleSidebar} logOut={logOut}/>
			<Sidebar open={sideBarOpen} handleSidebar={handleSidebar} tasks={data} setCategory={setCategory} />
			<Main open={sideBarOpen}>
				<CreateTask />
				<Tasks
					tasks={data}
				/>
				{/* routes here */}
				{/* 404 here */}
			</Main>
		</DragDropContext>
	);
};

export default Layout;