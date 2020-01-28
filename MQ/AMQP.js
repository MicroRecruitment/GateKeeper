const amqp = require('amqplib');
const HOST = 'amqp://szjbyoed:GzlJdcWQTZ7HTtmKBVknLDoTGWUIBWTw@hawk.rmq.cloudamqp.com/szjbyoed';

class AMQP {
  constructor(req_queue, processor) {
    this.send_ = null; 
    if (!(req_queue == '' || req_queue == null)) {
      this.consume_queue_ = req_queue;
    }
    this.cb_ = processor;
    
    var open = amqp.connect(HOST);
    open.then(this.Setup.bind(this));
  }

  async Setup(conn) {
    this.send_ = await conn.createChannel();
    var ch = await conn.createChannel();
    this.Consumer(ch);
  }

  async Send(queue, msg) {
    /* If a request has been made, loop until these are set. */
    while (!this.send_ || this.consume_queue_ == '');

    var data = {
      reply: this.consume_queue_,
      data: msg
    };

    this.send_.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
    return true;
  }

  async Consumer(ch) {
    /* Requested queue name. Create if not exists, if null random consumption */
    ch.assertQueue(this.req_queue, {
      exclusive: true
    }).then((function (q) {
      this.consume_queue_ = q.queue;
      /* Start consuming */
      console.log(q);
      ch.consume(q.queue, _process, {
        noAck: false
      });
    }).bind(this));
    
    var that = this;

    function _process(msg) {
      console.log(" [x] Received %s", msg.content.toString());
      that.cb_(msg);
      ch.ack(msg);
      console.log(" [x] Done");
    }
  }
}

module.exports = AMQP;
