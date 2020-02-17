const uuidv4 = require('uuid/v4');
const ENV = require('../env.json');
const AUTH_QUEUE = ENV.queues.AUTH_QUEUE;

module.exports = (ctrl) => {
  ctrl.Register = async function(registration_data, cb) {
    let metadata = {
      call: 'register',
      call_id: this.AddCallback(cb)
    };

    this.mq_.Send(AUTH_QUEUE, metadata, registration_data);
  }
  
  /*
	* Controller function for getting a user with password.
  * @queue: auth_queue
	* @author: Linus Berg
	* @param {int} client_id Socket.io ID, for reply.
	*/
  ctrl.Login = async function(login_data, cb) {
		var metadata = {
		  call: 'login',
      call_id: this.AddCallback(cb)
    }

    this.mq_.Send(AUTH_QUEUE, metadata, login_data);
  }

  /*
	* Controller function for checking user existance.
  * @queue: auth_queue
	* @author: Linus Berg
	* @param {string} username of user to check.
	*/
  ctrl.GetUser = async function(username, cb) {
		var metadata = {
		  call: 'get_user',
      call_id: this.AddCallback(cb)
    }

    this.mq_.Send(AUTH_QUEUE, metadata, username);
  }
}
