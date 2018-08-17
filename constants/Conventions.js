import format from 'date-fns/format'

exports.datetimeStr = (date = new Date()) => {
  return format(date, 'YYYY-MM-DD HH:MM Z')
}
