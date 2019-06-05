var AWS = require('aws-sdk');

AWS.config.update({region: 'eu-west-1'}); 
// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

for (i=0; i < 4; i++) {
  var seed = new Date().getTime();
  var body = {
    "status": "wait",
    "random": i + seed 
  };

  var params = {
    MessageGroupId: "CompPoC" + i +  seed ,
    MessageBody: JSON.stringify(body),
    QueueUrl: "https://eu-west-1.queue.amazonaws.com/245334408285/pocStart.fifo"
  };
  
  sqs.sendMessage(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.MessageId);
    }
  });
}

for (i=0; i < 4; i++) {
    var seed = new Date().getTime();
    var body = {
      "status": "authorized",
      "random": i + seed 
    };
  
    var params = {
      MessageGroupId: "C" + seed + i,
      MessageBody: JSON.stringify(body),
      QueueUrl: "https://eu-west-1.queue.amazonaws.com/245334408285/pocStart.fifo"
    };
    
    sqs.sendMessage(params, function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data.MessageId);
      }
    });
  }

  for (i=0; i < 4; i++) {
    var seed = new Date().getTime();
    var body = {
      "status": "prohibited",
      "random": i + seed
    };
  
    var params = {
      MessageGroupId: "C" + seed + i ,
      MessageBody: JSON.stringify(body),
      QueueUrl: "https://eu-west-1.queue.amazonaws.com/245334408285/pocStart.fifo"
    };
    
    sqs.sendMessage(params, function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data.MessageId);
      }
    });
  }
