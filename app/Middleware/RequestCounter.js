"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const { numOfRequests, pathsTaken } = require("../../config/prometheus");
class RequestCounter {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, response }, next) {
    // call next to advance the request
    // console.log(request.method(), request.path)
    try {
      if (request.url() != "/metrics") {
        numOfRequests.inc({ method: request.method() });
        pathsTaken.inc({ path: request.url() });
      }
      await next();
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = RequestCounter;
