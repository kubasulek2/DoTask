import React, { Fragment, useState } from 'react';

import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Main from './Main/Main';
import CreateTask from '../Tasks/CreateTask';
import Tasks from '../Tasks/Tasks';


const Layout = ({ data, setCategory }) => {
	const [sideBarOpen, setSidebarOpen] = useState(false);
	const handleSidebar = () => setSidebarOpen(prev => !prev);
	
	return (
		<Fragment>
			<Header handleSidebar={handleSidebar} />
			<Sidebar open={sideBarOpen} handleSidebar={handleSidebar} tasks={data} setCategory={setCategory}/>
			<Main open={sideBarOpen}>
				<CreateTask />
				<Tasks
					tasks={data}
				/>
			</Main>
		</Fragment>
	);
};

export default Layout;