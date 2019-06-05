var AWS = require('aws-sdk');
AWS.config.update({region: 'eu-west-1', 
hostname:'localstack',
endpoint:'http://localstack:4576',
accessKeyId:'test',
secretAccessKey:'test'});


// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

for (i=0; i < 20; i++) {
  var body = {
    "transaction": {
      "gateway": "Alipay",
      "reference": "anystring" + i,
      "applyTime": "2001-07-04T12:08:56+05:30",
      "dealId": "123" + i,
      "amount": "2000" + i * 100,
      "currency": "CNY",
      "destination": "CN",
      "sender": {
        "id": "1" + i,
        "accountNumber": "101" + i
      },
      "receiver": {
        "type": "EWALLET",
        "accountNumber": "102" + i,
        "country": "CN"
      }
    }
  };

  var params = {
    MessageGroupId: "messageGroup1" ,
    MessageDeduplicationId: "MessageDeduplicationId" + i,
    MessageBody: JSON.stringify(body) ,
    QueueUrl: "http://localstack:4576/queue/payment-instructions.fifo"
  };
  
  sqs.sendMessage(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.MessageId);
    }
  });
  

}



