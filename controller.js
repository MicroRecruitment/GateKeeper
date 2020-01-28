'use strict';
const rmq = require('./MQ/AMQP.js');
const model = require('./model.js');

const APP_QUEUE = 'applicant_queue';
const ADMIN_QUEUE = 'admin_queue';

class Controller {
  constructor() {
    /* Create new amqp connection with random consuming queue. */
    this.mq_ = new rmq(null, this.Process.bind(this));
    this.req = Math.round(Math.random() * 10000);
  }

  Process(msg) {
    var content = JSON.parse(msg.content.toString());
    console.log('Request id');
    console.log(content.data.id);
    console.log(this.req == content.data.id);
  }

  RBMQSetup(conn) {
    console.log("Connected");
    /* RECV */ 
  }
  
  async Applicant(data) {
    //this.mq_.Send(APP_QUEUE, data);
    this.mq_.Send(APP_QUEUE, {id: this.req});
  }

}

module.exports = Controller;
