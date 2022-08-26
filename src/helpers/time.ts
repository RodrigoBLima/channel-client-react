import moment from "moment";

export function getHourAndMinutes(date: number) {
  const dateFromTime = moment(date);

  return !date ? "-" : dateFromTime.format("HH:mm");
}
