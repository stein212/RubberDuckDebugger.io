var Pair = module.exports = {};
var path = require('path');

Pair.class = {
  // Contain the different queues that is to contain the userId.
  // An Id will match the the top user in the queue.

  receive: {
    queue: [],
    queueStatus: function() {
      return (this.queue.length == 0) ? true : false;
    },
    // Add to receive
    AddToQueue: function(id) {
      this.queue.push(id);
      return this.queue.length;
    }
  },

  insist: {
    queue: [],
    queueStatus: function() {
      return (this.queue.length == 0) ? true : false;
    },
    // Add to receive
    AddToQueue: function(id) {
      this.queue.push(id);
      return this.queue.length;
    }
  },
  // intent = receive||Insist
  GetAPair: function(intent, id) {
    var message;
    if(intent != undefined && id != undefined) {
      if(intent === 'receive') {
        message = 'insist is empty: ' + this.insist.queueStatus();
        if(this.insist.queueStatus())
        return JSON.stringify({isEmpty: true, error: message});
        else
        return JSON.stringify({queue: this.insist.queue, insist_id: this.insist.queue.shift(), insist_queue_size: this.insist.queue.length});
      }
      else if(intent === 'insist') {
        message = 'receive is empty: ' + this.receive.queueStatus();
        if(this.receive.queueStatus())
        return JSON.stringify({isEmpty: true, error: message});
        else
        return JSON.stringify({queue: this.receive.queue, receive_id: this.receive.queue.shift(), receive_queue_size: this.receive.queue.length});
      }
    }
    return null;
  }
}
