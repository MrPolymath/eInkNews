const CronJob = require('cron').CronJob

const job = new CronJob({
  cronTime: '0 */6 * * *',
  onTick: function() {
    // Es corre cada 6 hores
  },
  start: false,
  timeZone: 'America/Los_Angeles'
});
job.start();
