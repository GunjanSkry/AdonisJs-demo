const aws = require('aws-sdk');
const Env = use('Env')

aws.config.update({
    "region": "local-01",
    "sslEnabled": false,
    "endpoint": Env.get('SQS_ENDPOINT', 'http://localhost:4576')
  });
var sqs = new aws.SQS();
module.exports = sqs