import React, { Fragment, useState } from 'react';

import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Main from './Main/Main';

const Layout = () => {
	const [sideBarOpen, setSidebarOpen] = useState(false);
	const handleSidebar = () => setSidebarOpen(prev => !prev);

	return (
		<Fragment>
			<Header handleSidebar={handleSidebar} />
			<Sidebar open={sideBarOpen} handleSidebar={handleSidebar}/>
			<Main>
				
			</Main>
		</Fragment>
	);
};

export default Layout;