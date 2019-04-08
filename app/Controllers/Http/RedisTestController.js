"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/**
 * Resourceful controller for interacting with redistests
 */
const Redis = use("Redis");

class RedisTestController {
  /**
   * Render a form to be used for creating a new redistest.
   * GET redistests/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
    const Test = await Redis.set("test", request.raw(), "EX", 300);
    if (Test) {
      response.send("Chached");
    } else {
      response.send("Not Chached");
    }
  }

  /**
   * Display a single redistest.
   * GET redistests/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const cachedTest = await Redis.get("test");
    if (cachedTest) {
      response.send(cachedTest);
    } else {
      response.send("Cached data doesn't exist or expired");
    }
  }
}

module.exports = RedisTestController;
