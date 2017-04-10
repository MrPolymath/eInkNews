import {} from 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import https from 'https'

var CronJob = require('cron').CronJob;

const job = new CronJob('00 10 * * * *', function() {
  https.get('https://einknews-api.herokuapp.com/');
  console.log("crash");
  }, function () {}, false
);

import './config/db'
import api from './api'

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use('/', api)

app.listen( process.env.PORT || 3000, function () {
  console.log('Running!')
  job.start()
  console.log('job status', job.running);
})
