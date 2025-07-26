export const formatDate = (dateString: string | Date, formatOptions: Intl.DateTimeFormatOptions = {}) => {
  const date = new Date(dateString);
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleDateString(undefined, { ...defaultOptions, ...formatOptions });
};

export const formatTime = (dateString: string | Date, formatOptions: Intl.DateTimeFormatOptions = {}) => {
  const date = new Date(dateString);
  const defaultOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };
  return date.toLocaleTimeString(undefined, { ...defaultOptions, ...formatOptions });
};