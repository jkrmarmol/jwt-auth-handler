const mongoose = require('mongoose');

const MongoDB = mongoose.set('strictQuery', true);

MongoDB.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

MongoDB.connection.on('connected', () => {
  console.log('Mongoose connection is now open.')
})

MongoDB.connection.on('error', (err) => {
  console.log('Mongoose connection error : ', err)
})

MongoDB.connection.on('disconnected', () => {
  console.log('Mongoose connection has been disconnected')
})

module.exports = MongoDB