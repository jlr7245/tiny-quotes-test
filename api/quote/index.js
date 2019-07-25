const {
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString
} = require('graphql')

const Quote = require('./Quote')
const { QuoteType, QuoteMutation } = require('./QuoteTypes')

const query = {
  quoteList: {
    type: GraphQLList(QuoteType),
    resolve: (root, args, ctx) => {
      return Quote.findAll()
        .then(quotes => quotes)
        .catch(err => {
          throw new Error(err)
        })
    }
  },
  singleQuote: {
    type: QuoteType,
    args: {
      id: { type: GraphQLInt },
    },
    resolve: (root, { id }, ctx) => {
      return Quote.findOne(id)
        .then(quote => quote)
        .catch(err => {
          throw new Error(err)
        })
    }
  }
}

const mutation = {
  createQuote: {
    type: QuoteMutation,
    args: {
      quote: { type: new GraphQLNonNull(GraphQLString) },
      author: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: (root, { quote, author }, ctx) => {
      return new Quote({ quote, author }).save()
        .then(quote => {
          if (quote) return ({
            success: true,
            quote
          })
          else throw new Error('Quote not created')
        })
        .catch(err => new Error(err))
    }
  }
}

module.exports = {
  query, mutation
};
