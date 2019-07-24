const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLNumber
} = require('graphql')

const QuoteType = new GraphQLObjectType({
  name: 'Quote',
  fields: () => ({
    id: { type: GraphQLNumber },
    quote: { type: GraphQLString },
    author: { type: GraphQLString }
  })
})

const QuoteMutation = new GraphQLObjectType({
  name: 'QuoteMutation',
  description: 'The outcome of a mutation request',
  fields: () => ({
    success: { type: GraphQLBoolean },
    quote: { type: Quote }
  })
})

module.exports = {
  QuoteType
}
