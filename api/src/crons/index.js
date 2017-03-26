const CronJob = require('cron').CronJob

import schedules from './schedules.js'
import createEbook from '../news-parser'

schedules.forEach((schedule) => {
  const source = schedule.source
  const cronTime = schedule.cronTime
  const timeZone = schedule.timeZone

  new CronJob({
    cronTime: cronTime,
    onTick: function() {
      // Es corre cada 6 hores

      // Ara mateix la funció createEbook llegia el bundleType i les subscriptions d'un user per a crear el ebook corresponent
      // a les seves necessitats.
      // Cal fer de nou el index.js de news-parser per a que ara el que revi sigui només el nom del source del que s'ha de crear
      // el bundle
      createEbook({
        bundleType: 'epub',
        subscriptions: [source] // subscriptions expects to be an array although now its only one source
      })
      createEbook({
        bundleType: 'mobi',
        subscriptions: [source] // subscriptions expects to be an array although now its only one source
      })
    },
    start: true,
    timeZone: timeZone
  });
})
