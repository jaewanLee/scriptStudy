
isId = (c) -> isIdStart(c) or isDigit(c)

isIdStart = (c) -> (c >= 'a' and c <= 'Z') or (c >= 'A' and c <= 'Z') or (c is '$') or (c is '_')

isDigit = (c) -> (c >= '0') and (c <= '9')

class Lexer 
  @T_END = 0
  @T_NUMBER = 1
  @T_ID = 2
  @T_STRING = 3
  @T_LPAREN = 4
  @T_RPAREN = 5
  @T_LBRACKET = 6
  @T_RBRACKET = 7

  constructor: (@input) ->

  next: () ->
    return Lexer.T_END if not @input.hasMore()
    @lexeme = ''
    @input.advance (c) -> c is ' ' or (c is '\t') or (c is '\r') or (c is '\n')
    @input.save()
    ch = @input.peek 0
    switch ch
      when '('
        @input.inc()
        token = Lexer.T_LPAREN
      when ')'
        @input.inc()
        token = Lexer.T_RPAREN
      when '['
        @input.inc()
        token = Lexer.T_LBRACKET
      when ']'
        @input.inc()
        token = Lexer.T_RBRACKET
      else 
        if isDigit ch
          @input.advance (c) -> isDigit(c) or (c is '.')
          token = Lexer.T_NUMBER        
          @lexeme = @input.get()
        else if (ch is '\'') or (ch is '"') # quoted string
          lf = ch
          @input.inc()
          @input.save()
          @input.advance (c) -> c isnt lf
          @lexeme = @input.get()
          @input.inc() if @input.peek(0) is lf
          token = Lexer.T_STRING
        else 
          @input.advance (c) ->  (c isnt ' ') and (c isnt '\'') and (c isnt '"') and (c isnt '(') and (c isnt ')') and (c isnt '[') and (c isnt ']') and (c isnt '\t') and (c isnt '\r') and (c isnt '\n')
          token = Lexer.T_ID
          @lexeme = @input.get()
    token

module.exports = Lexer

