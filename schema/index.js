const { GraphQLObjectType, GraphQLSchema } = require('graphql')
const {
  query: quotequery,
  mutation: quotemutation
} = require('../api/quote')
const { QuoteType: Quote } = require('../api/quote/QuoteTypes')

const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => Object.assign({}, quotequery)
})

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => Object.assign({}, quotemutation)
})

const QuerySchema = new GraphQLSchema({
  query,
  mutation,
  types: [Quote]
})

module.exports = { QuerySchema }
