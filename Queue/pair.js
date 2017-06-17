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
    if(intent !== undefined && id !== undefined) {
      return 'hello';
    }
    return null;
  }
}
