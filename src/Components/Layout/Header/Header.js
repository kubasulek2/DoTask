import React from 'react';
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

const useStyles = makeStyles(({ palette, shadows, breakpoints, zIndex, spacing }) => ({
	root: {
		flex: '0 1 auto',
		boxShadow: shadows[0],
		position: 'relative',
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
	logoIcon: {
		width: 35,
		height: 35,
		marginRight: spacing(1)
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

const Header = ({ handleSidebar }) => {
	const classes = useStyles();

	const handleOpen = () => handleSidebar(prev => !prev);
	const handleLogOut = () => {
		window.location.reload();
	};
	return (
		<AppBar className={classes.root}>
			<Toolbar className={classes.toolbar}>
				<IconButton
					edge='start'
					className={classes.menuButton}
					aria-label='open drawer'
					onClick={handleOpen}
				>
					<div className={classes.menuIconContainer}>
						<MenuIcon className={classes.menuIcon} />
					</div>
				</IconButton>
				<div className={classes.logoContainer}>
					<LogoIcon className={classes.logoIcon} />
					<Hidden xsDown>
						<Typography variant='h6' className={classes.logoTitle}>
							DO TASK
						</Typography>
					</Hidden>
				</div>
				<Dropdown />
				<Button className={classes.logoutButton} onClick={handleLogOut} >Logout</Button>
			</Toolbar>
		</AppBar>
	);
};
export default Header;