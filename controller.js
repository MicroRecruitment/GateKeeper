'use strict';
const rmq = require('./MQ/AMQP.js');
const model = require('./model.js');
const uuidv4 = require('uuid/v4');
const ENV = require('./env.json');

/* Queues to send requests to. */
const APP_QUEUE = ENV.queues.APP_QUEUE;
const AUTH_QUEUE = ENV.queues.AUTH_QUEUE;
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
  Process(frame) {
		let call_id = frame.metadata.call_id;
		console.log('Gateway Controller (Process)');
		/* Client callback, tell client what happened. */
		this.ongoing_[call_id]({
			status: frame.content.status,
			result: frame.content.result
		});
		delete this.ongoing_[call_id];
  }

 /*
	* Controller function for registering a user.
  * @queue: auth_queue
	* @author: Linus Berg
	* @param {int} client_id Socket.io ID, for reply.
	*/
  async Register(registration_data, client_cb) {
		console.log('Gateway Controller (Register)');
		let call_id = uuidv4();

		this.ongoing_[call_id] = client_cb;
    
    let metadata = {
      call: 'register',
      call_id: call_id
    };

    let content = registration_data;
    this.mq_.Send(AUTH_QUEUE, metadata, content);
  }
 
  /*
	* Controller function for registering a user.
  * @queue: auth_queue
	* @author: Linus Berg
	* @param {int} client_id Socket.io ID, for reply.
	*/
  async Login(login_data, client_cb) {
		console.log('Gateway Controller (Login)');
		var call_id = uuidv4();

		this.ongoing_[call_id] = client_cb;

		var metadata = {
		  call: 'login',
      call_id: call_id
    }

    this.mq_.Send(AUTH_QUEUE, metadata, login_data);
  }

}

module.exports = Controller;
