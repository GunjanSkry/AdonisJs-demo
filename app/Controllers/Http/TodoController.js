"use strict";

const ironium = use("Ironium");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const sqs = require("../../../config/aws");
const Env = use("Env");

/**
 * Resourceful controller for interacting with todos
 */
class TodoController {
  /**
   * Render a form to be used for creating a new todo.
   * GET todos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
    var params = {
      MessageBody: JSON.stringify(request.post()),
      QueueUrl: `${Env.get("SQS_PREFIX")}/${Env.get("FIRST_QUEUE")}`,
      DelaySeconds: 0
    };

    sqs.sendMessage(params, function(err, data) {
      if (err) {
        console.log(err);
      } else {
        // const jobID = ironium.dispatch('business', data)
        console.log(data);
      }
    });
    response.send("Messege is sent to the SQS queue for further processing");
  }

  /**
   * Create/save a new todo.
   * POST todos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */

  async show({ params, request, response, view }) {
    response.send();
  }
}

module.exports = TodoController;
