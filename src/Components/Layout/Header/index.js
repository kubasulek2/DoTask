import React, { useEffect } from 'react';
import store from 'store';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { ReactComponent as LogoIcon } from '../../../Assets/logo.svg';
import Dropdown from './DropDown';
import * as actions from '../../../Store/Actions';

const useStyles = makeStyles(({ palette, shadows, breakpoints, zIndex, spacing }) => ({
	root: {
		flex: '0 1 auto',
		boxShadow: shadows[1],
		position: 'fixed',
		zIndex: zIndex.drawer + 1,
	},
	toolbar: {
		paddingLeft: spacing(1.5),
		paddingRight: spacing(1.5)
	},
	menuButton: {
		marginRight: spacing(1.5),
		paddingLeft: spacing(1.5)
	},
	menuIconContainer: {
		width: 35,
		height: 35
	},
	menuIcon: {
		width: '100%',
		height: '100%',
		color: palette.text.white
	},
	logoContainer: {
		flexGrow: 1,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		[breakpoints.down('xs')]: {
			justifyContent: 'flex-start',
		}
	},
	logo: {
		cursor: 'pointer',
		display: 'flex'
	},
	logoIcon: {
		width: 35,
		height: 35,
		marginRight: spacing(1),
	},
	logoTitle: {
		color: palette.text.white,
		fontWeight: 700,
	},
	logoutButton: {
		color: palette.error.light,
		textTransform: 'initial',
		fontWeight: 'bold',
	}
}));

const Header = ({ handleSidebar, handleAuth, history, allowSort, sortAllowed, lists, activeList, sortTask }) => {
	const classes = useStyles();

	useEffect(() => {
		let regex = /(?:tasks\/)(.+(?=[/?])|.+(?=$))/;
		let match = window.location.pathname.match(regex);
		let listIds = Object.values(lists).map(t => t.id);
		match = match ? match[1] : match;
		(match !== activeList && listIds.includes(match) && allowSort(true, match));
		(sortAllowed && !listIds.includes(match) && allowSort(false));

	});

	const logOut = () => {
		store.remove('auth');
		handleAuth(false);
		history.push('/login');
	};

	const navigateHome = () => history.push('/');

	return (
		<AppBar className={classes.root}>
			<Toolbar className={classes.toolbar}>
				<IconButton
					edge='start'
					className={classes.menuButton}
					aria-label='open drawer'
					onClick={handleSidebar}
				>
					<div className={classes.menuIconContainer}>
						<MenuIcon className={classes.menuIcon} />
					</div>
				</IconButton>
				<div className={classes.logoContainer}>
					<div className={classes.logo} onClick={navigateHome}>
						<LogoIcon className={classes.logoIcon} />
						<Hidden xsDown>
							<Typography variant='h6' className={classes.logoTitle}>
								DoTask
							</Typography>
						</Hidden>
					</div>
				</div>
				<Dropdown disabled={!sortAllowed} activeList={activeList} sortTasks={sortTask} />
				<Button className={classes.logoutButton} onClick={logOut} >Logout</Button>
			</Toolbar>
		</AppBar>
	);
};
const mapDispatchToProps = dispatch => ({
	handleAuth: bool => dispatch(actions.handleAuth(bool)),
	allowSort: (bool, listId = null) => dispatch(actions.allowSort(bool, listId)),
	sortTask: (activeList, type) => dispatch(actions.sortTasks(activeList, type))
});

const mapStateToProps = ({ app, tasks }) => ({
	sortAllowed: app.sortAllowed,
	activeList: app.activeList,
	lists: tasks.lists
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));