"use strict";
const Env = use("Env");
const sqs = require("../../config/aws");
const { Consumer } = require("sqs-consumer");
const SQS_PREFIX = Env.get("SQS_PREFIX", "");

const User = use("App/Models/User");
const fetchUrl = `${SQS_PREFIX}/${Env.get("FIRST_QUEUE")}`;
const sendUrl = `${SQS_PREFIX}/${Env.get("SECOND_QUEUE")}`;

const StoreUser = Consumer.create({
  queueUrl: fetchUrl,
  handleMessage: async message => {
    let body = JSON.parse(message.Body);
    const userInfo = body.user;
    const user_id = body.user.user_id;

    let newUser = await User.findBy("user_id", user_id);
    if (newUser) {
      newUser.merge(userInfo);
      await newUser.save();
    } else {
      newUser = await User.create(userInfo);
    }

    var params = {
      MessageBody: JSON.stringify({ ...newUser.$attributes, todo: body.todo }),
      QueueUrl: sendUrl,
      DelaySeconds: 0
    };

    sqs.sendMessage(params, function(err, data) {
      if (err) {
        console.log(err);
      }
    });
  }
});

StoreUser.on("error", (err, messege) => {
  console.error(err);
});

StoreUser.on("processing_error", (err, messege) => {
  if (err.errno === 1062 && err.code === "ER_DUP_ENTRY") {
    const params = {
      QueueUrl: fetchUrl,
      ReceiptHandle: messege.ReceiptHandle
    };
    sqs.deleteMessage(params, function(err, data) {
      if (err) {
        res.send(err);
      } else {
        console.log("deleted", data);
      }
    });
  } else {
    console.error(err);
  }
});

module.exports = StoreUser;
