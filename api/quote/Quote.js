const db = require('../../db/config')
const { modelUtils, modelStatics } = require('../utils')
const schema = require('./QuoteSchema')

function Quote({ id = null, quote, author }) {
  this.id = this._validate(id, 'id')
  this.quote = this._validate(quote, 'quote')
  this.author = this._validate(author, 'author')
}

Object.setPrototypeOf(Quote, modelStatics(db, 'quotes'))
Quote.prototype = Object.assign(Quote.prototype, modelUtils(schema))

Quote.prototype.save = function() {
  return db.one(`
    INSERT INTO quotes (quote, author)
    VALUES ($/quote/, $/author/)
    RETURNING *
  `, this)
  .then(quote => this._modify(quote))
}

module.exports = Quote
