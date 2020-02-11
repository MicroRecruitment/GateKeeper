const uuidv4 = require('uuid/v4');
const ENV = require('../env.json');
const APP_QUEUE = ENV.queues.APP_QUEUE;

module.exports = (ctrl) => {
  ctrl.GetAllUsers = async function(cb){
		let call_id = uuidv4();
		this.ongoing_[call_id] = cb;
    let metadata = {
      call: 'GetAllUsers',
      call_id: call_id
    };
    let content = {};
    this.mq_.Send(APP_QUEUE, metadata, content);
  }

  ctrl.GetAllApplicants = async function(cb){
		let call_id = uuidv4();
		this.ongoing_[call_id] = cb;
    let metadata = {
      call: 'GetAllApplicants',
      call_id: call_id
    };
    let content = {};
    this.mq_.Send(APP_QUEUE, metadata, content);
  }
}
