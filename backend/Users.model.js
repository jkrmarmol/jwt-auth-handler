const MongoDB = require('./dbConfig');
const bcrypt = require('bcrypt');

const usersSchema = MongoDB.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    unique: true,
    required: true
  }
}, {collection: 'users'})

usersSchema.pre('save', function(next) {
  const encryptPass = bcrypt.hashSync(this.password, 10)
  this.password = encryptPass;
  next();
})

const Users = MongoDB.model('Users', usersSchema)

module.exports = Users;