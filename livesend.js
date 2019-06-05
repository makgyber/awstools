var AWS = require('aws-sdk');

AWS.config.update({region: 'eu-west-1'}); 
// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

for (i=0; i < 10; i++) {
  // var i = 4;
  var body = {
    "transaction": {
      "gateway": "alipay",
      "reference": "anystring" + i + 32,
      "applyTime": "2001-07-04T12:08:56+05:30",
      "dealId": "123" + i + 23,
      "amount": "2000" + i * 105,
      "currency": "CNY",
      "destination": "CN",
      "sender": {
        "id": "1" + 2,
        "accountNumber": "101" + i + 2
      },
      "receiver": {
        "type": "EWALLET",
        "accountNumber": "102" + i,
        "country": "CN"
      }
    }
  };

  var params = {
    MessageGroupId: "EWallet",
    MessageBody: JSON.stringify(body),
    QueueUrl: "https://eu-west-1.queue.amazonaws.com/245334408285/efor-testing.fifo"
  };
  
  sqs.sendMessage(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.MessageId);
    }
  });
  

}



