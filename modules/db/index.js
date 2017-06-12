import mongoose from 'mongoose';
let dbURI = 'mongodb://localhost/bemean'

if (process.env.MONGODB_DB_ENABLED) {
  const username = process.env.MONGODB_DB_USERNAME
  const password = process.env.MONGODB_DB_PASSWORD
  const host = process.env.MONGODB_DB_HOST
  const port = process.env.MONGODB_DB_PORT
  const app_name = process.env.MONGODB_DB_NAME
  dbURI = `${username}:${password}@${host}:${port}/${app_name}`
}

mongoose.Promise = global.Promise
mongoose.connect(dbURI)

mongoose.connection.on('  ', () => {
  console.log(`Mongoose default connection open to ${dbURI}`)
})
mongoose.connection.on('error', err => {
  console.log(`Mongoose default connection error: ${err}`)
})
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected')
})
mongoose.connection.on('open', () => {
  console.log('Mongoose default connection is open')
})

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log(
      'Mongoose default connection disconnected through app termination'
    )
    process.exit(0)
  })
})

export default {
  setting: require('./setting'),
  user: require('./user'),
  message: require('./message')
};
