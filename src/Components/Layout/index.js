import React, { useState, useEffect } from 'react';
import { Redirect, Switch, Route } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Header from './Header';
import Sidebar from './Sidebar';
import Main from './Main';
import Tasks from '../Tasks';
import FourOhFour from '../FourOhFour';
import ListDialog from '../TaskLists/ListDialog';
import Loader from '../UI/Loader';

const useStyles = makeStyles(() => ({
	root: {
		width: '100vw',
	},
	content: {
		width: '100%',
		height: '100%',
	}
}));
export const Layout = ({ loading }) => {
	const classes = useStyles();
	const [sideBarOpen, setSidebarOpen] = useState(false);
	const matches = useMediaQuery('(max-width:550px)');

	useEffect(() => {
		const open = sessionStorage.getItem('sidebarOpen');
		if (open) setSidebarOpen(true);
	}, []);

	const handleSidebar = () => {
		!sideBarOpen ? sessionStorage.setItem('sidebarOpen', true) : sessionStorage.removeItem('sidebarOpen');
		setSidebarOpen(prev => !prev);
	};

	const handleSidebarMobile = () => {
		if (sideBarOpen && matches) {
			sessionStorage.removeItem('sidebarOpen');
			setSidebarOpen(false);
		}
	};


	return (
		<div className={classes.root}>
			<Header handleSidebar={handleSidebar} />
			<Sidebar
				open={sideBarOpen}
				handleSidebar={handleSidebar}
			/>
			<Main open={sideBarOpen}>
				<div className={classes.content} onClick={handleSidebarMobile}>
					{loading ? <Loader color='#4fa84a' /> : null}
					<Route path='/:params*/newList' render={props => <ListDialog {...props} />} />
					<Route path='/:params*/editList' render={props => <ListDialog {...props} edit />} />
					<Switch>
						<Route path='/tasks' render={(props) => <Tasks {...props} />} />
						<Route path='/' exact render={() => <Redirect to='/tasks/all' />} />
						<Route path='/' component={FourOhFour} />
					</Switch>
				</div>
			</Main>
		</div>
	);
};


export default Layout;
