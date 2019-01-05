rt     = require './runtime'
Lexer  = require './lexer'

class Parser 
  constructor: (@lexer) ->

  parseExpList: () -> 
    result = []
    while (e = @parseExpression())?
      result.push e
    result

  parseExpression: () ->
    r = @lexer.next()
    switch r
      when Lexer.T_LPAREN
        @parseExpList()
      when Lexer.T_LBRACKET
        res = @parseExpList()
        res.unshift rt.identifier 'array'
        res
      when Lexer.T_ID
        if @lexer.lexeme is 'false'
          false
        else if @lexer.lexeme is 'true'
          true
        else
          res = rt.identifier @lexer.lexeme
      when Lexer.T_STRING
        @lexer.lexeme
      when Lexer.T_NUMBER
        parseFloat @lexer.lexeme
      else
        null

  parse: () -> @parseExpression()

module.exports = Parser

