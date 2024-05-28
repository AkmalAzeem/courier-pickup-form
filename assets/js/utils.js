import  dayjs from "dayjs"

export function formatMyDate(date, format = "DD  MMM YYYY, hh:mm a") {
    return dayjs(date).format(format)
  }
  