import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
	margin: {
		margin: theme.spacing(1),
	},
}));

const Search = () => {
	const classes = useStyles();
	return (
		<form>
			<div className={classes.margin}>
				<Grid container spacing={1} alignItems='flex-end'>
					<Grid item>
						<SearchIcon />
					</Grid>
					<Grid item>
						<TextField id='search' label='search' />
					</Grid>
				</Grid>
			</div>
		</form>
	);
}

export default Search;


