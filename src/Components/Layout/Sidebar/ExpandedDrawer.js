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
import MoreIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Grade';
import SearchIcon from '@material-ui/icons/Search';
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
	}
}));
const ExpandedDrawer = ({ handleSidebar }) => {
	const classes = useStyles();
	return (
		<List className={classes.root}>
			<ListItem className={classes.listItem}>
				<ListItemAvatar>
					<Avatar
						className={classes.avatar}
						alt='profile'
						src={img}
					/>
				</ListItemAvatar>
			</ListItem>
			<ListItem className={classes.listItem}>
				<ListItemIcon className={classes.searchButton} onClick={handleSidebar} style={{padding:'12px'}}>
					<SearchIcon />
				</ListItemIcon>
			</ListItem>
			<Divider />
			<ListItem className={classes.listItem} selected={true}>
				<IconButton color='secondary'>
					<AllIcon />
				</IconButton>
			</ListItem>
			<ListItem className={classes.listItem}>
				<IconButton color='secondary'>
					<FavoriteIcon />
				</IconButton>
			</ListItem>
		</List>
	);
};

export default ExpandedDrawer;
