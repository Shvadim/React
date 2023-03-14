const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()
const PORT = config.get('port') || 5000

app.use('api/auth', require('./routes/auth.routes'))

async function start() {
  try {
    console.log('start OK')
    mongoose.set('strictQuery', false)
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    app.listen(PORT, () => console.log(`server started on port ${PORT}!`))
  } catch (error) {
    console.log('server error:', error.message)
    process.exit(1)
  }
}

start()
