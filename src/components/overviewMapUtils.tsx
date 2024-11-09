export const getTimezoneCity = () => {
  const userLocale = navigator.language;
  const dateTimeOptions = new Intl.DateTimeFormat(userLocale).resolvedOptions();
  const timezoneCity = dateTimeOptions.timeZone.split('/')[1];
  return timezoneCity;
};
