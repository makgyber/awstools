// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');

AWS.config.update({
  region: 'eu-west-1'
}); 

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});
var queueURL = "https://sqs.eu-west-1.amazonaws.com/245334408285/efor-testing.fifo";
var params = {
 AttributeNames: [
    "SentTimestamp"
 ],
 MaxNumberOfMessages: 10,
 MessageAttributeNames: [
    "All"
 ],
 QueueUrl: queueURL,
 VisibilityTimeout: 0,
 WaitTimeSeconds: 0
};

sqs.receiveMessage(params, function(err, data) {
  if (err) {
    console.log("Receive Error", err);
  } else if (data.Messages) {
    console.log('data: ', data.Messages.length);  
    var deleteParams = {
      QueueUrl: queueURL,
      ReceiptHandle: data.Messages[0].ReceiptHandle
    };
    // sqs.deleteMessage(deleteParams, function(err, data) {
    //   if (err) {
    //     console.log("Delete Error", err);
    //   } else {
    //     console.log("Message Deleted", data);
    //   }
    // });
  }
});