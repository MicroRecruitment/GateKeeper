'use strict';
const rmq = require('./MQ/AMQP.js');
const model = require('./model.js');
const uuidv4 = require('uuid/v4');

class Controller {
  constructor() {
    this.mq_ = new rmq(null, this.Process.bind(this));

    this.callbacks_ = {};
    require('./controllers/auth.js')(this);
    require('./controllers/applicants.js')(this);
  }

  AddCallback(cb) {
    let call_id = uuidv4();
    this.callbacks_[call_id] = cb;
    return call_id;
  }

  ResolveCallback(frame) {
    let call_id = frame.metadata.call_id;
    this.callbacks_[call_id]({
      status: frame.content.status,
      result: frame.content.result,
    });
    delete this.callbacks_[call_id];
  }

  /*
   * Processing function for queue messages. Typically results.
   * @author: Linus Berg
   * @param {obj} Message object from RabbitMQ.
   */
  Process(frame) {
    /* Client callback, tell client what happened. */
    this.ResolveCallback(frame);
  }
}

module.exports = Controller;
