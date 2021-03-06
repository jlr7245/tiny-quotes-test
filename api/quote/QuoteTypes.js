const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLBoolean
} = require('graphql')

const QuoteType = new GraphQLObjectType({
  name: 'Quote',
  fields: () => ({
    id: { type: GraphQLInt },
    quote: { type: GraphQLString },
    author: { type: GraphQLString }
  })
})

const QuoteMutation = new GraphQLObjectType({
  name: 'QuoteMutation',
  description: 'The outcome of a mutation request',
  fields: () => ({
    success: { type: GraphQLBoolean },
    quote: { type: QuoteType }
  })
})

module.exports = {
  QuoteType,
  QuoteMutation
}
