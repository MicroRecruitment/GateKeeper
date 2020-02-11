const uuidv4 = require('uuid/v4');
const ENV = require('../env.json');
const AUTH_QUEUE = ENV.queues.AUTH_QUEUE;

module.exports = (ctrl) => {
  ctrl.Register = async function(registration_data, client_cb) {
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
	* Controller function for getting a user with password.
  * @queue: auth_queue
	* @author: Linus Berg
	* @param {int} client_id Socket.io ID, for reply.
	*/
  ctrl.Login = async function(login_data, client_cb) {
		console.log('Gateway Controller (Login)');
		var call_id = uuidv4();

		this.ongoing_[call_id] = client_cb;

		var metadata = {
		  call: 'login',
      call_id: call_id
    }

    this.mq_.Send(AUTH_QUEUE, metadata, login_data);
  }

  /*
	* Controller function for checking user existance.
  * @queue: auth_queue
	* @author: Linus Berg
	* @param {string} username of user to check.
	*/
  ctrl.UserExists = async function(username, client_cb) {
		var call_id = uuidv4();

		this.ongoing_[call_id] = client_cb;

		var metadata = {
		  call: 'user_exists',
      call_id: call_id
    }

    this.mq_.Send(AUTH_QUEUE, metadata, username);
  }
}
