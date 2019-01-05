(function() {
  var Lexer, isDigit, isId, isIdStart;

  isId = function(c) {
    return isIdStart(c) || isDigit(c);
  };

  isIdStart = function(c) {
    return (c >= 'a' && c <= 'Z') || (c >= 'A' && c <= 'Z') || (c === '$') || (c === '_');
  };

  isDigit = function(c) {
    return (c >= '0') && (c <= '9');
  };

  Lexer = (function() {
    Lexer.T_END = 0;

    Lexer.T_NUMBER = 1;

    Lexer.T_ID = 2;

    Lexer.T_STRING = 3;

    Lexer.T_LPAREN = 4;

    Lexer.T_RPAREN = 5;

    Lexer.T_LBRACKET = 6;

    Lexer.T_RBRACKET = 7;

    function Lexer(input) {
      this.input = input;
    }

    Lexer.prototype.next = function() {
      var ch, lf, token;
      if (!this.input.hasMore()) {
        return Lexer.T_END;
      }
      this.lexeme = '';
      this.input.advance(function(c) {
        return c === ' ' || (c === '\t') || (c === '\r') || (c === '\n');
      });
      this.input.save();
      ch = this.input.peek(0);
      switch (ch) {
        case '(':
          this.input.inc();
          token = Lexer.T_LPAREN;
          break;
        case ')':
          this.input.inc();
          token = Lexer.T_RPAREN;
          break;
        case '[':
          this.input.inc();
          token = Lexer.T_LBRACKET;
          break;
        case ']':
          this.input.inc();
          token = Lexer.T_RBRACKET;
          break;
        default:
          if (isDigit(ch)) {
            this.input.advance(function(c) {
              return isDigit(c) || (c === '.');
            });
            token = Lexer.T_NUMBER;
            this.lexeme = this.input.get();
          } else if ((ch === '\'') || (ch === '"')) {
            lf = ch;
            this.input.inc();
            this.input.save();
            this.input.advance(function(c) {
              return c !== lf;
            });
            this.lexeme = this.input.get();
            if (this.input.peek(0) === lf) {
              this.input.inc();
            }
            token = Lexer.T_STRING;
          } else {
            this.input.advance(function(c) {
              return (c !== ' ') && (c !== '\'') && (c !== '"') && (c !== '(') && (c !== ')') && (c !== '[') && (c !== ']') && (c !== '\t') && (c !== '\r') && (c !== '\n');
            });
            token = Lexer.T_ID;
            this.lexeme = this.input.get();
          }
      }
      return token;
    };

    return Lexer;

  })();

  module.exports = Lexer;

}).call(this);
