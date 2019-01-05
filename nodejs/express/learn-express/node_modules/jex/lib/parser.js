(function() {
  var Lexer, Parser, rt;

  rt = require('./runtime');

  Lexer = require('./lexer');

  Parser = (function() {
    function Parser(lexer) {
      this.lexer = lexer;
    }

    Parser.prototype.parseExpList = function() {
      var e, result;
      result = [];
      while ((e = this.parseExpression()) != null) {
        result.push(e);
      }
      return result;
    };

    Parser.prototype.parseExpression = function() {
      var r, res;
      r = this.lexer.next();
      switch (r) {
        case Lexer.T_LPAREN:
          return this.parseExpList();
        case Lexer.T_LBRACKET:
          res = this.parseExpList();
          res.unshift(rt.identifier('array'));
          return res;
        case Lexer.T_ID:
          if (this.lexer.lexeme === 'false') {
            return false;
          } else if (this.lexer.lexeme === 'true') {
            return true;
          } else {
            return res = rt.identifier(this.lexer.lexeme);
          }
          break;
        case Lexer.T_STRING:
          return this.lexer.lexeme;
        case Lexer.T_NUMBER:
          return parseFloat(this.lexer.lexeme);
        default:
          return null;
      }
    };

    Parser.prototype.parse = function() {
      return this.parseExpression();
    };

    return Parser;

  })();

  module.exports = Parser;

}).call(this);
