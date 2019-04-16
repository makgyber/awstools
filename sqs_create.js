var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'REGION', 
hostname:'localstack',
endpoint:'http://localstack:4576',
accessKeyId:'test',
secretAccessKey:'test'});

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

var params = {
  QueueName: 'payment_instructions.fifo',
  Attributes: {
    'DelaySeconds': '1',
    'MessageRetentionPeriod': '86400',
    'FifoQueue': 'true',
    'MessageGroupId': "messageGroup1",
    'MessageDeduplicationId': "MessageDeduplicationId1",
  }
};

sqs.createQueue(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.QueueUrl);
  }
});