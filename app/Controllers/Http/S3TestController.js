"use strict";

const Drive = use("Drive");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with s3tests
 */
class S3TestController {
  /**
   * Render a form to be used for creating a new s3test.
   * GET s3tests/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
    const updated = await Drive.disk("s3").put(
      "hello.txt",
      Buffer.from(request.raw())
    );
    if (updated) {
      response.send(updated);
    } else {
      response.send("Something went wrong while uploading to S3.");
    }
  }

  /**
   * Display a single s3test.
   * GET s3tests/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const { user_id } = request.get();
    let file = undefined;
    try {
      if (user_id) {
        file = await Drive.disk("s3").get(`${user_id}.txt`);
      } else {
        file = await Drive.disk("s3").get("hello.txt");
      }
      response.send(file);
    } catch (e) {
      response.send("File does not exist in S3 bucket.");
    }
  }
}

module.exports = S3TestController;
