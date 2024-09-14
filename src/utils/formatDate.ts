const formatter = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium',
  hour12: false,
});

export const getFormatedDate = (date: Date): string => {
  return formatter.format(date);
};
