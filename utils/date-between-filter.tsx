import { FilterFn } from '@tanstack/react-table';
import { parseISO, isValid } from 'date-fns';

export const dateBetweenFilterFn: FilterFn<any> = (row, columnId, value) => {
  const rawDate = row.getValue(columnId);

  // Handle string dates (like your ISO format)
  let date: Date;
  if (typeof rawDate === 'string') {
    date = parseISO(rawDate);
  } else if (rawDate instanceof Date) {
    date = rawDate;
  } else {
    return false; // Invalid date format
  }

  // Check if date is valid
  if (!isValid(date)) return false;

  const [start, end] = value || []; // value => two date input values


  // If one filter defined and date is null filter it
  if ((start || end) && !date) return false;

  if (start && !end) {
    return date.getTime() >= start.getTime();
  } else if (!start && end) {
    return date.getTime() <= end.getTime();
  } else if (start && end) {
    return date.getTime() >= start.getTime() && date.getTime() <= end.getTime();
  } else {
    return true;
  }
};

dateBetweenFilterFn.autoRemove = (value: any) => {
  return !value || (!value[0] && !value[1]);
};

export default dateBetweenFilterFn;