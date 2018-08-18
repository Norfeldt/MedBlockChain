import format from 'date-fns/format'

exports.datetimeStr = date => {
  const dt = date ? date : new Date()
  return String(format(dt, 'YYYY-MM-DD HH:mm:ss Z'))
}
