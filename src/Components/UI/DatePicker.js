import React, { Fragment } from 'react';
import MomentUtils from '@date-io/moment';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';


const Picker = ({ isOpen, handleClose, date, handleDate }) => {
	const match = useMediaQuery('(min-width:400px)');
	const width = match ? 'initial' : '300px';
	return (
		<Fragment>
			<MuiPickersUtilsProvider utils={MomentUtils}>
				<DatePicker
					style={{ maxWidth: width }}
					open={isOpen}
					value={date}
					disablePast
					onChange={handleDate}
					label="With Today Button"
					showTodayButton
					onClose={handleClose}
				/>
			</MuiPickersUtilsProvider>
		</Fragment>

	);
};

export default Picker;