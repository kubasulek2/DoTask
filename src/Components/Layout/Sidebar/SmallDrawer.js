import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AllIcon from '@material-ui/icons/AllInclusive';
import MoreIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Grade';
import SearchIcon from '@material-ui/icons/Search';
import TodayIcon from '@material-ui/icons/Today';
import Tooltip from '@material-ui/core/Tooltip';

import img from '../../../Assets/face-facial-hair-fine-looking-guy-614810.jpg';

const useStyles = makeStyles(({ spacing, palette }) => ({
	root: {
		paddingTop: spacing(2.5),
		flexGrow: 0
	},
	listItem: {
		padding: spacing(.5)
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
	tooltip: {
		top: '-10px !important',
		left: '-2px !important'
	}
}));
const SmallDrawer = ({ handleSidebar, setSearchFocus}) => {
	const classes = useStyles();
	
	const handleSearch = () => {
		handleSidebar();
		setSearchFocus(true);
	};
	return (
		<List className={classes.root}>
			<Link to='/user'>
				<ListItem className={classes.listItem}>
					<Tooltip title='profile' arrow classes={{ popper: classes.tooltip }}>
						<ListItemAvatar>
							<Avatar
								className={classes.avatar}
								alt='profile'
								src={img}
							/>
						</ListItemAvatar>

					</Tooltip>
				</ListItem>
			</Link>
			<Link to='/tasks/search'>
				<ListItem className={classes.listItem}>
					<Tooltip title='search' arrow classes={{ popper: classes.tooltip }}>
						<IconButton className={classes.searchButton} onClick={handleSearch}>
							<SearchIcon />
						</IconButton>
					</Tooltip>
				</ListItem>
			</Link>
			<Link to='/tasks/all'>
				<ListItem className={classes.listItem} selected={true}>
					<Tooltip title='all tasks' arrow classes={{ popper: classes.tooltip }}>
						<IconButton color='secondary'>
							<AllIcon />
						</IconButton>
					</Tooltip>
				</ListItem>
			</Link>
			<Link to='/tasks/favorite'>
				<ListItem className={classes.listItem}>
					<Tooltip title='favorite tasks' arrow classes={{ popper: classes.tooltip }}>
						<IconButton color='secondary'>
							<FavoriteIcon />
						</IconButton>
					</Tooltip>
				</ListItem>
			</Link>
			<Link to='tasks/today'>
				<ListItem className={classes.listItem}>
					<Tooltip title="today's tasks" arrow classes={{ popper: classes.tooltip }}>
						<IconButton color='secondary'>
							<TodayIcon />
						</IconButton>
					</Tooltip>
				</ListItem>
			</Link>
			<ListItem className={classes.listItem}>
				<Tooltip title='expand' arrow classes={{ popper: classes.tooltip }}>
					<IconButton color='secondary' onClick={handleSidebar}>
						<MoreIcon />
					</IconButton>
				</Tooltip>
			</ListItem>

		</List>
	);
};

export default SmallDrawer;
