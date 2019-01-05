class Identifier
  constructor: (@name) ->

identifier = (name) -> new Identifier name

isIdentifier = (v) -> v instanceof Identifier

getIdName = (id) -> id.name

module.exports = {
  identifier
  isIdentifier
  getIdName
}