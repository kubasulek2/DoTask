import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import AllIcon from '@material-ui/icons/AllInclusive';
import FavoriteIcon from '@material-ui/icons/Grade';
import SearchIcon from '@material-ui/icons/Search';
import img from '../../../Assets/face-facial-hair-fine-looking-guy-614810.jpg';

import TasksLists from '../../Tasks/TasksLists';
import { ListItemSecondaryAction } from '@material-ui/core';

const useStyles = makeStyles(({ spacing, palette }) => ({
	root: {
		height: 'calc(100vh - 57px - 56px)',
		paddingTop: spacing(2.5),
		flexGrow: 1,
		paddingBottom: spacing(3),
		overflowY: 'scroll',
		overflowX: 'hidden'
	},
	listItem: {
		padding: spacing(.5)
	},
	user: { 
		fontWeight: 'bold',
		marginLeft: spacing(1),
		color: palette.secondary.dark
	},
	hover: {
		'&:hover': {
			backgroundColor: 'rgba(0, 0, 0, 0.08)'
		}

	},
	listText: {
		width: 120,
		fontWeight: 'bold',
	},
	avatar: {
		width: 48,
		height: 48,
		marginBottom: spacing(1.5),
		cursor: 'pointer',
	},
	searchButton: {
		color: palette.primary.light
	},
	icon: {
		padding: spacing(1.5)
	}
}));

const ExpandedDrawer = ({ handleSidebar }) => {
	const classes = useStyles();
	return (
		<List className={classes.root}>
			<ListItem className={classes.listItem} button>
				<ListItemAvatar>
					<Avatar
						className={classes.avatar}
						alt='profile'
						src={img}
					/>
				</ListItemAvatar>
				<ListItemText  
					primary='Kuba Sulkowski'
					classes={{ primary: classes.user }}
					primaryTypographyProps={{
						noWrap: true,
						component: 'p'
					}} 	
				/>
			</ListItem>
			<ListItem className={[classes.listItem, classes.hover].join(' ')}>
				<IconButton className={classes.searchButton} onClick={handleSidebar}>
					<SearchIcon />
				</IconButton>
			</ListItem>
			<ListItem className={classes.listItem} selected={true} button>
				<ListItemIcon className={classes.icon}>
					<AllIcon color='secondary'/>
				</ListItemIcon>
				<ListItemText 
					primary='All tasks' 
					classes={{ primary: classes.listText }}
					primaryTypographyProps={{
						noWrap: true,
						color: 'textSecondary',
						component: 'p'
					}}
				/>
			</ListItem>
			<ListItem className={classes.listItem} button>
				<ListItemIcon className={classes.icon}>
					<FavoriteIcon color='secondary'/>
				</ListItemIcon>
				<ListItemText 
					primary='Favorites'
					classes={{primary:classes.listText}}
					primaryTypographyProps={{
						noWrap: true,
						color: 'textSecondary',
						component: 'p'
					}} 	
				/>
				<ListItemSecondaryAction>
					11
				</ListItemSecondaryAction>
			</ListItem>
			<Divider />
			<TasksLists />
		</List>
	);
};

export default ExpandedDrawer;
