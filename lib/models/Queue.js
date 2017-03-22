import assert from 'assert';
import assign from 'lodash.assign';
import async from 'async';
import bcrypt from 'bcrypt';
import debug from 'debug';
import mongoose from '../mongo';
import User from './User'; 

const log = debug('site:Queue');

var userSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.ObjectId, index: true },
});

var queueSchema = mongoose.Schema({
  _id: { type: String, index: true },
  users: [userSchema],
});

const ID = 'queue-id';

queueSchema.statics.get = function (cb) {
  return this.findOne({ _id: ID }, (err, queue) => {
    if (err) return cb(err);

    User.findAll((err, users) => {
      // user natural sort of queue for waitlist
      for (var i = 0; i < queue.users.length; i++) {
        assign(queue.users[i], users.find((uu) => {
          return uu._id.toString() == queue.users[i]._id.toString();
        }));
      }
      // sort accepted by date
      var accepted = users.filter((user) => {
        return !! user.accepted;
      }).sort((a, b) => {
        return a.accepted - b.accepted;
      });
      
      var inQueue = queue.users;

      // return both
      cb(null, {
        inQueue,
        accepted
      })
    });
  });
};

queueSchema.statics.getPublic = function (cb) {
  return this.findOne({ _id: ID }, (err, queue) => {
    if (err) return cb(err);

    User.findAllPublic((err, users) => {
      // user natural sort of queue for waitlist
      for (var i = 0; i < queue.users.length; i++) {
        assign(queue.users[i], users.find((uu) => {
          return uu._id.toString() == queue.users[i]._id.toString();
        }));
      }
      // sort accepted by date
      var accepted = users.filter((user) => {
        return !! user.accepted;
      }).sort((a, b) => {
        return a.accepted - b.accepted;
      });
      
      var inQueue = queue.users;

      // return both
      cb(null, {
        inQueue,
        accepted
      })
    });
  });
};

queueSchema.statics.acceptUser = function (userId, cb) {

  log(`accepting user ${userId}`);

  this.findOne({ _id: ID }, (err, queue) => {
    if (err) return cb(err);

    const index = queue.get('users').findIndex((user) => {
      return user._id.toString() === userId;
    });

    queue.users.splice(index, 1);

    log(`rmeoved user ${userId} from queue position ${index}`);

    queue.save((err) => {
      if (err) return cb(err);
      return this.get(cb);
    });
  });
}

queueSchema.statics.addUser = function (userId, cb) {

  log(`adding user ${userId}`);

  this.findOne({ _id: ID }, (err, queue) => {
    if (err) return cb(err);

    queue.get('users').push({
      _id: userId
    });

    queue.save((err) => {
      if (err) return cb(err);
      return this.get(cb);
    });
  });
}

queueSchema.statics.unacceptUser = function (userId, cb) {

  log(`accepting user ${userId}`);

  this.findOne({ _id: ID }, (err, queue) => {
    if (err) return cb(err);

    queue.get('users').push({
      _id: userId
    });

    queue.save((err) => {
      if (err) return cb(err);
      return this.get(cb);
    });
  });
}

queueSchema.statics.moveUser = function (userId, placeInQueue, cb) {
  
  log(`moving user ${userId} to location ${placeInQueue}`);

  this.findOne({ _id: ID }, (err, queue) => {
    if (err) return cb(err);

    console.log(queue.users)
    
    const index = queue.users.findIndex((user) => {
      return user._id.toString() === userId;
    });

    log(`user ${userId} found at location ${index}`);

    const user = queue.users.splice(index, 1)[0];
    
    queue.users.splice(placeInQueue, 0, user);

    log(`user ${user} moved to location ${placeInQueue}`);

    console.log(queue)

    queue.save(cb);
  });
}

const model = mongoose.model('Queue', queueSchema);

/* auto-populate default record */
model.findOne({ _id: ID }, (err, queue) => {
  if (! queue) {
    User.findAll((err, users) => {
      if (err) throw err;
      console.log('creating default queue record');
      queue = new model();
      queue._id = ID;
      queue.users = [];
      users.forEach((user) => {
        if ( ! user.accepted) {
          queue.users.push({
            _id: user._id
          });
        }
      })
      console.log('created default queue record', queue)
      queue.save();
    });
  }
});

export default model;