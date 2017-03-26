
// The schedule object saves the times at which each source bundle should be updated
// Documentation on how to write crontab: http://crontab.org/

const schedules = [
  {
    source: 'elmundo',
    cronTime: '0 */6 * * *',
    timeZone: 'America/Los_Angeles'
  },
  {
    source: 'hackernews',
    cronTime: '0 */6 * * *',
    timeZone: 'America/Los_Angeles'
  },
  {
    source: 'newyorktimes',
    cronTime: '0 */6 * * *',
    timeZone: 'America/Los_Angeles'
  }
]

export default schedules;
