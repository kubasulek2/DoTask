import moment from 'moment';

const Units = Object.freeze(['hours', 'days', 'weeks']);

export const formatDate = dateStr => dateStr ? moment(dateStr).format('DD.MM.YYYY') : false;
export const hasDatePassed = dateStr => dateStr ? moment(dateStr).isSameOrBefore(Date.now(), 'day') : false;
export const isDateToday = dateStr => dateStr ? moment(dateStr).isSame(Date.now(), 'day') : false;
export const formatNotification = ({number, unit}) => `${number} ${number === 1 ? Units[unit].replace(/s$/, '') : Units[unit]} before`;