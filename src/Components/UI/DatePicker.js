import React, { Fragment } from 'react';
import MomentUtils from '@date-io/moment';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';


const Picker = ({ isOpen, handleClose, date, handleDate }) => {
	return (
		<Fragment>
			<MuiPickersUtilsProvider utils={MomentUtils}>
				<DatePicker
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