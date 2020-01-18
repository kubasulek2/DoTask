import React, { Fragment, useState } from 'react';

import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Main from './Main/Main';
import CreateTask from '../Tasks/CreateTask';
import Tasks from '../Tasks/Tasks';

import data from '../../Utils/data';

const Layout = () => {
	const [sideBarOpen, setSidebarOpen] = useState(false);
	const handleSidebar = () => setSidebarOpen(prev => !prev);
	//temporary for drag and drop
	const [tasks, setTasks] = useState(data);

	return (
		<Fragment>
			<Header handleSidebar={handleSidebar} />
			<Sidebar open={sideBarOpen} handleSidebar={handleSidebar} tasks={tasks} setTasks={setTasks} />
			<Main open={sideBarOpen}>
				<CreateTask />
				<Tasks
					tasks={tasks}
					setTasks={setTasks}
				/>
			</Main>
		</Fragment>
	);
};

export default Layout;