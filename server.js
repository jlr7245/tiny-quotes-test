require('dotenv').config()

const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const { ApolloServer } = require('apollo-server-express')

const { QuerySchema } = require('./schema')


const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
  res.locals.data = {}
  next()
})

const server = new ApolloServer({ schema: QuerySchema })
server.applyMiddleware({ app })

app.use(express.static('public'))

app.use('*', (req, res) => {
  res.status(404).send('Not Found')
})

app.use((err, req, res, next) => {
  console.warn(err)
  res.status(500).json({ error: err, message: err.message })
})

const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}${server.graphqlPath}`)
})
