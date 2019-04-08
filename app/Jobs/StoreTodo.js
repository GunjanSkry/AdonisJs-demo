"use strict";
const Env = use("Env");
const { Consumer } = require("sqs-consumer");
const SQS_PREFIX = Env.get("SQS_PREFIX", "");
const Drive = use("Drive");

const Todo = use("App/Models/Todo");
const User = use("App/Models/User");
const fetchUrl = `${SQS_PREFIX}/${Env.get("SECOND_QUEUE")}`;

const StoreTodo = Consumer.create({
  queueUrl: fetchUrl,
  handleMessage: async message => {
    let body = JSON.parse(message.Body);
    const todo = new Todo();
    todo.user_id = body["user_id"];
    todo.todo = body.todo;
    await todo.save();
    const user = await User.findBy("user_id", body["user_id"]);
    const userObj = user.toJSON();
    /* To get all todos of a User (example of relationship)
      toJSON() to convert a serialized object to Json object*/
    const todos = await user.todos().fetch();
    const todosObj = todos.toJSON();
    console.log(userObj, todosObj);
    await Drive.disk("s3").put(
      body["user_id"] + ".txt",
      JSON.stringify({ user: userObj, todos: todosObj })
    );
  }
});

StoreTodo.on("error", (err, messege) => {
  console.error(err);
});

StoreTodo.on("processing_error", (err, messege) => {
  console.error(err);
});

module.exports = StoreTodo;
