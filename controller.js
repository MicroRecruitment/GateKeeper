'use strict';
const rmq = require('./MQ/AMQP.js');
const model = require('./model.js');

class Controller {
  constructor(socket) {
    this.mq_ = new rmq(null, this.Process.bind(this));
		this.socket_ = socket;

		this.ongoing_ = {};
    require('./controllers/auth.js')(this); 
    require('./controllers/applicants.js')(this); 
    
    this.GetAllApplicants(function(result) {
      console.log('Data');
      console.log(result);
    });
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
}

module.exports = Controller;
