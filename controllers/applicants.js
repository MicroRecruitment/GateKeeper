const ENV = require('../env.json');
const APP_QUEUE = ENV.queues.APP_QUEUE;

module.exports = (ctrl) => {
  ctrl.GetAllUsers = async function(cb) {
    let metadata = {
      call: 'GetAllUsers',
      call_id: this.AddCallback(cb)
    };
    let content = {};
    this.mq_.Send(APP_QUEUE, metadata, content);
  }

  ctrl.GetAllApplicants = async function(cb) {
    let metadata = {
      call: 'GetAllApplicants',
      call_id: this.AddCallback(cb)
    };
    let content = {};
    this.mq_.Send(APP_QUEUE, metadata, content);
  }

  ctrl.SetApplicant = async function(applicant_data, cb) {
    let metadata = {
      call: 'SetApplicant',
      call_id: this.AddCallback(cb)
    };
    let content = {
      id: applicant_data.id,
      state: applicant_data.state
    };
    this.mq_.Send(APP_QUEUE, metadata, content);

  }
}
