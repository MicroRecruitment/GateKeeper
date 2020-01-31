'use strict';
const rmq = require('./MQ/AMQP.js');
const model = require('./model.js');
const uuidv4 = require('uuid/v4');
const ENV = require('./env.json');

import ENV from 'env.json';

/* Queues to send requests to. */
const APP_QUEUE = ENV.queues.APP_QUEUE;
const ADMIN_QUEUE = ENV.queues.ADMIN_QUEUE;

class Controller {
  constructor(socket) {
    /* Create new amqp connection with random consuming queue. */
    this.mq_ = new rmq(null, this.Process.bind(this));
		this.socket_ = socket;

		this.ongoing_ = {};
  }

 /*
	* Processing function for queue messages. Typically results.
	* @author: Linus Berg
	* @param {obj} Message object from RabbitMQ.
	*/
  Process(msg) {
		var call_id = msg.data.call_id;
		console.log(msg);
		console.log(this.ongoing_);
		/* Client callback, tell client what happened. */
		this.ongoing_[call_id]({
			status: msg.data.status,
			result: msg.data.result
		});
		delete this.ongoing_[call_id];
  }

 /*
	* Controller function for registering a user.
	* @author: Linus Berg
	* @param {int} client_id Socket.io ID, for reply.
	*/
  async Register(registration_data, client_cb) {
		console.log('Gateway Controller (Register)');
		var call_id = uuidv4();

		this.ongoing_[call_id] = client_cb;

    this.mq_.Send(APP_QUEUE, {
      call: 'register',
			call_id: call_id,
      registration_data: registration_data
    });
  }

}

module.exports = Controller;
