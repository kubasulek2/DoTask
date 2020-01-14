import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { ReactComponent as LogoIcon } from '../../Assets/logo.svg';

const useStyles = makeStyles(({ palette, shadows, breakpoints, zIndex, spacing }) => ({
	root: {
		flex: '0 1 auto',
		background: palette.background.default,
		boxShadow: shadows[1],
		position: 'relative',
		zIndex: zIndex.drawer + 1,
	},
	menuButton: {
		marginRight: spacing(1.5),
		[breakpoints.up('lg')]: {
			display: 'none',
		},
		padding: 6
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
		justifyContent: 'flex-start',
		alignItems: 'center',
		[breakpoints.down('md')]: {
			justifyContent: 'center',
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
		[breakpoints.down('xs')]: {
			fontSize: 16
		}
	},
}));
/* App Header and part of App navigation*/
const Header = ({ handleMobile }) => {
	const classes = useStyles();

	/* Reload app when click on logOut button */
	const handleLogOut = () => {
		window.location.reload();
	};
	return (
		<AppBar className={classes.root}>
			<Toolbar>
				<IconButton
					edge='start'
					className={classes.menuButton}
					aria-label='open drawer'
					onClick={()=>{}}
				>
					<div className={classes.menuIconContainer}>
						<MenuIcon className={classes.menuIcon} />
					</div>
				</IconButton>
				<div className={classes.logoContainer}>
					<LogoIcon className={classes.logoIcon} />
					<Typography variant='h6' className={classes.logoTitle}>
						DO TASK
					</Typography>
				</div>
				<Button color='secondary' onClick={handleLogOut} >Logout</Button>
			</Toolbar>
		</AppBar>
	);
};
export default Header;