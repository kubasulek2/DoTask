import React from 'react';
import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import AllIcon from '@material-ui/icons/AllInclusive';
import FavoriteIcon from '@material-ui/icons/Grade';
import TodayIcon from '@material-ui/icons/Today';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import img from '../../../Assets/face-facial-hair-fine-looking-guy-614810.jpg';
import TasksLists from '../../Tasks/TasksLists/TasksLists';
import SearchForm from '../../../Containers/Forms/Search';

const useStyles = makeStyles(({ spacing, palette }) => ({
	root: {
		height: 'calc(100vh - 57px - 56px)',
		paddingTop: spacing(2.5),
		flexGrow: 1,
		paddingBottom: spacing(3),
		overflowY: 'auto',
		overflowX: 'hidden',
		scrollbarColor: palette.grey[300] + ' ' + palette.background.paper
	},
	listItem: {
		padding: spacing(.5),
	},
	user: {
		fontWeight: 'bold',
		marginLeft: spacing(1),
		color: palette.secondary.dark
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
	icon: {
		padding: spacing(1.5)
	},
	badge: {
		color: palette.grey[500],
		fontSize: 12,
		fontWeight: 'bold',
	}
}));

const ExpandedDrawer = ({ tasks, setSearchFocus, searchFocus, history, active, setActive }) => {
	const classes = useStyles();
	const favorites = Object.values(tasks.tasks).filter(task => task.favorite).length;
	
	const handleClick = event => {
		let location = '/' + event.currentTarget.dataset.type;
		location = location !== '/user' ? '/tasks' + location : location;
		history.push(location);
	};

	return (
		<List className={classes.root}>
			<ListItem
				className={classes.listItem}
				button
				onClick={handleClick}
				data-type='user'
				selected={active === 'user'}
			>
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
			<SearchForm focus={searchFocus} setFocus={setSearchFocus} />
			<ListItem
				className={classes.listItem}
				button
				onClick={handleClick}
				data-type='all'
				selected={active === 'all'}
			>
				<ListItemIcon className={classes.icon}>
					<AllIcon color='secondary' />
				</ListItemIcon>
				<ListItemText
					primary='All'
					classes={{ primary: classes.listText }}
					primaryTypographyProps={{
						noWrap: true,
						color: 'textSecondary',
						component: 'p'
					}}
				/>
				<ListItemSecondaryAction className={classes.badge}>
					{Object.keys(tasks.tasks).length}
				</ListItemSecondaryAction>
			</ListItem>
			<ListItem
				className={classes.listItem}
				button
				onClick={handleClick}
				data-type='favorite'
				selected={active === 'favorite'}
			>
				<ListItemIcon className={classes.icon}>
					<FavoriteIcon color='secondary' />
				</ListItemIcon>
				<ListItemText
					primary='Favorite'
					classes={{ primary: classes.listText }}
					primaryTypographyProps={{
						noWrap: true,
						color: 'textSecondary',
						component: 'p'
					}}
				/>
				<ListItemSecondaryAction className={classes.badge}>
					{favorites}
				</ListItemSecondaryAction>
			</ListItem>
			<ListItem
				className={classes.listItem}
				button
				onClick={handleClick}
				data-type='today'
				selected={active === 'today'}
			>
				<ListItemIcon className={classes.icon}>
					<TodayIcon color='secondary' />
				</ListItemIcon>
				<ListItemText
					primary="Today's"
					classes={{ primary: classes.listText }}
					primaryTypographyProps={{
						noWrap: true,
						color: 'textSecondary',
						component: 'p'
					}}
				/>
				<ListItemSecondaryAction className={classes.badge}>
					0
				</ListItemSecondaryAction>
			</ListItem>
			<Divider />
			<TasksLists
				tasks={tasks}
				handleClick={handleClick}
				active={active}
				setActive={setActive}
			/>
		</List>
	);
};

export default withRouter(ExpandedDrawer);
