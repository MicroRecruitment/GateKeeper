const ENV = require('../env.json');
const APP_QUEUE = ENV.queues.APP_QUEUE;

module.exports = (ctrl) => {
  /*
   * Get All Users.
   * @author: Linus Berg
   * @param {function} callback function.
   */
  ctrl.GetAllUsers = async function(cb) {
    let metadata = {
      call: 'GetAllUsers',
      call_id: this.AddCallback(cb)
    };
    let content = {};
    this.mq_.Send(APP_QUEUE, metadata, content);
  }

  /*
   * Get all users that have applied.
   * @author: Linus Berg
   * @param {function} callback function.
   */
  ctrl.GetAllApplicants = async function(cb) {
    let metadata = {
      call: 'GetAllApplicants',
      call_id: this.AddCallback(cb)
    };
    let content = {};
    this.mq_.Send(APP_QUEUE, metadata, content);
  }

  /*
   * Send application to database.
   * @author: Linus Berg
   * @param {obj} Application data.
   * @param {function} callback function.
   */
  ctrl.Apply = async function(apply_data, cb) {
    let metadata = {
      call: 'Apply',
      call_id: this.AddCallback(cb)
    };
    this.mq_.Send(APP_QUEUE, metadata, apply_data);

  }

  /*
   * Set Applicant Status. 
   * @author: Linus Berg
   * @param {obj} Applicant data.
   * @param {function} callback function.
   */
  ctrl.SetApplicant = async function(applicant_data, cb) {
    let metadata = {
      call: 'SetApplicant',
      call_id: this.AddCallback(cb)
    };
    this.mq_.Send(APP_QUEUE, metadata, applicant_data);

  }
}
