import moment from 'moment';

const Units = Object.freeze(['hours', 'days', 'weeks']);

export const formatDate = dateStr => moment(dateStr).format('DD.MM.YYYY');
export const hasDatePassed = dateStr => moment(dateStr).isSameOrBefore(Date.now(), 'day');
export const isDateToday = dateStr => moment(dateStr).isSame(Date.now(), 'day');
export const formatNotification = ({number, unit}) => `${number} ${number === 1 ? Units[unit].replace(/s$/, '') : Units[unit]} before`;