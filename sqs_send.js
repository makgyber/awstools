var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'REGION'});

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

for (i=0; i < 25; i++) {
  // var i = 4;
  var body = '{"sendAmount": "' + (100 + i*100) + '", "sendCurrency":"USD"}';

  var params = {
    MessageAttributes: {
      "Provider": {
        DataType: "String",
        StringValue: "AliPay"
      },
      "TransactionReference": {
        DataType: "String",
        StringValue: "TransactionReference" + i
      },
      "SendCurrency": {
        DataType: "String",
        StringValue: "USD"
      }
    },
    MessageGroupId: "messageGroup1" + i,
    MessageDeduplicationId: "MessageDeduplicationId" + i,
    MessageBody: body,
    QueueUrl: "http://localhost:4576/queue/payment_instructions.fifo"
  };
  
  sqs.sendMessage(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.MessageId);
    }
  });
  

}



