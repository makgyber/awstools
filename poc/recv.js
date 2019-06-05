// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');

AWS.config.update({
  region: 'eu-west-1'
}); 

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});
var queueURL = "https://sqs.eu-west-1.amazonaws.com/245334408285/pocStart.fifo";
var params = {
 AttributeNames: [
    "SentTimestamp"
 ],
 MaxNumberOfMessages: 10,
 MessageAttributeNames: [
    "All"
 ],
 QueueUrl: queueURL,
 VisibilityTimeout: 10,
 WaitTimeSeconds: 20
};

sqs.receiveMessage(params, function(err, data) {
  if (err) {
    console.log("Receive Error", err);
  } else if (data.Messages) {
    console.log('data: ', data.Messages.length);  

    for(i=0; i < data.Messages.length; i++) {
        var msg = data.Messages[i];
        var status = JSON.parse(msg.Body).status;

        
        console.log(status);
        if (status === 'wait') {
            var changeParams = {
                QueueUrl: queueURL, /* required */
                ReceiptHandle: msg.ReceiptHandle, /* required */
                VisibilityTimeout: 200 /* required */
            }
            sqs.changeMessageVisibility(changeParams, function(err, data){
                if (err) console.log(err, err.stack); // an error occurred
                else     console.log(data);           // successful response
            });
        } else {
            if (status === 'authorized') {
                //send to pocEnd.fifo
                var sendParams = {
                    MessageGroupId: "CompPoC" + new Date().getTime() + i,
                    MessageBody: msg.Body,
                    QueueUrl: "https://eu-west-1.queue.amazonaws.com/245334408285/pocEnd.fifo"
                  };
                  
                  sqs.sendMessage(sendParams, function(err, data) {
                    if (err) {
                      console.log("Error", err);
                    } else {
                      console.log("Success", data.MessageId);
                    }
                  });
            } 
            var deleteParams = {
                QueueUrl: queueURL,
                ReceiptHandle: data.Messages[i].ReceiptHandle
              };
            sqs.deleteMessage(deleteParams, function(err, data) {
                if (err) {
                    console.log("Delete Error", err);
                } else {
                    console.log("Message Deleted", data);
                }
            });
        }
        
    }
    
  }
});