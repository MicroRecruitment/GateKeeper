'use strict';
const rmq = require('./MQ/AMQP.js');
const model = require('./model.js');
const uuidv4 = require('uuid/v4');

/* Queues to send requests to. */
const APP_QUEUE = 'applicant_queue';
const ADMIN_QUEUE = 'admin_queue';

class Controller {
  constructor() {
    /* Create new amqp connection with random consuming queue. */
    this.mq_ = new rmq(null, this.Process.bind(this));
  }

 /*
	* Processing function for queue messages. Typically results.
	* @author: Linus Berg
	* @param {obj} Message object from RabbitMQ.
	*/
  Process(msg) {
    var content = JSON.parse(msg.content.toString());
		console.log(msg);
  }

 /*
	* Controller function for registering a user.
	* @author: Linus Berg
	* @param {int} client_id Socket.io ID, for reply.
	*/
  async Register(client_id, registration_data) {
    //this.mq_.Send(APP_QUEUE, data);
		console.log('Gateway Controller (Register)');
    this.mq_.Send(APP_QUEUE, {
      call: 'register',
			call_id: uuidv4(),
			client_id: client_id,
      registration_data: registration_data
    });
  }

}

module.exports = Controller;
