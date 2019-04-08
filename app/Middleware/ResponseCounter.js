"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const { responses } = require("../../config/prometheus");
var onFinished = require("on-finished");

class ResponseCounter {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, response, time }, next) {
    // call next to advance the request
    try {
      const start = process.hrtime();
      await next();
      onFinished(response.response, function() {
        const end = process.hrtime(start);
        const diff = (end[0] * 1e9 + end[1]) / 1e6;
        if (request.url() != "/metrics") {
          responses
            .labels(
              request.method(),
              request.url(),
              response.response.statusCode
            )
            .observe(diff);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = ResponseCounter;
