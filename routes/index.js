var express = require('express');
var router = express.Router();

var request = require('request'),
    crypto = require('crypto');
var async = require('async');


/* GET home page. */
router.get('/', function(req, res, next) {

  var username = '【ユーザ名】',
      apiKey = '【APIキー】',
      siteid = '【サイトID】';

  var date = new Date().toISOString(),
      hmac = crypto.createHmac('sha256', apiKey).update(date).digest('hex');

  request.post({
    url: 'https://api.cxense.com/traffic/keyword',
    headers: { 'X-cXense-Authentication': 'username=' + username + ' date=' + date + ' hmac-sha256-hex=' + hmac },
    body: { start: -3600, siteId: siteid },
    json: true
  }, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log('The event group count: ' + body.groups.length);
//      res.render('index', { title: 'Cxense API results', siteId: siteid, results: body.groups});
      res.send('index', { title: 'Cxense API results', siteId: siteid, results: body.groups});
    }
  });
});

module.exports = router;

