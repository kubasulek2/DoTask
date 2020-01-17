import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(({ spacing, palette }) => ({
	listItem: {
		width: 270,
		padding: spacing(.5)
	},
	hover: {
		'&:hover': {
			backgroundColor: 'rgba(0, 0, 0, 0.08)',
			'& input': {
				background: 'inherit'
			}
		}
	},
	searchButton: {
		color: palette.primary.light
	},
	search: {
		fontSize: 16,
		padding: 8,
		border: 'none',
		color: palette.secondary.light,
		'&::placeholder': {
			color: palette.grey[400]
		},
		'&:focus': {
			outline: 'none'
		},
		
	}
}));

const Search = () => {
	const classes = useStyles();
	return (
		<ListItem className={[classes.listItem, classes.hover].join(' ')}>
			<form onSubmit={()=> console.log(123)}>
				<IconButton className={classes.searchButton} type='submit'>
					<SearchIcon />
				</IconButton>
				<input type='text' placeholder='search' className={classes.search} />
			</form>
		</ListItem>
	);
}

export default Search;


