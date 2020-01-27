import moment from 'moment';


export const formatDate = dateStr => moment(dateStr).format('DD.MM.YYYY');
export const hasDatePassed = dateStr => moment(dateStr).isSameOrBefore(Date.now(), 'day');
export const isDateToday = dateStr => moment(dateStr).isSame(Date.now(), 'day');