import React, { Fragment, useState } from 'react';

import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';

const Layout = () => {
	const [sideBarOpen, setSidebarOpen] = useState(false);

	return (
		<Fragment>
			<Header handleSidebar={setSidebarOpen} searchOpen={sideBarOpen} />
			<Sidebar open={sideBarOpen} />
		</Fragment>
	);
};

export default Layout;