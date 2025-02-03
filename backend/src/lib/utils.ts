import * as moment from 'moment';
export function calcStreak(
  logs: {
    id: number;
    userId: number;
    groupId: number;
    completionTime: Date;
  }[],
  interval: number, // in day's
  tolerance: number, // in seconds
) {
  let previous = moment();
  let streak = 0;

  for (let log of logs) {
    const completionTime = moment(log.completionTime);
    const future = completionTime
      .add(interval, 'days')
      .add(tolerance, 'seconds');
    if (future.isAfter(previous)) {
      streak++;
    } else {
      break;
    }
    previous = completionTime;
  }
  return streak;
}
export function parseInterval(interval: string) {
  const valueRegex = RegExp('^[0-9]+');
  const quantityRegex = RegExp('(days?)|(weeks?)|(months?)|(years?)$');
  const data = {
    value: interval.match(valueRegex)[0],
    quantity: interval.match(quantityRegex)[0],
  };
  return moment.duration({ [data.quantity]: data.value }).asDays();
}
