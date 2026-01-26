
const DAY_IN_MS = 24 * 60 * 60 * 1000;

export const getDateDaysAgo = (days:number) => {
  return new Date(Date.now() - days * DAY_IN_MS);
};