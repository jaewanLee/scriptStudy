Input     = require './input'
Lexer     = require './lexer'
Parser    = require './parser'
Compiler  = require './compiler'
RT        = require './runtime'

compile = (str, opts) ->
  i = new Input str
  l = new Lexer i
  p = new Parser l
  c = new Compiler opts
  c.compile p.parse()

compileToFunction = (str, opts) ->
  i = new Input str
  l = new Lexer i
  p = new Parser l
  c = new Compiler opts
  c.compileToFunction p.parse()

module.exports = {
  Input
  Lexer
  Parser
  RT
  Compiler
  compile
  compileToFunction
}
