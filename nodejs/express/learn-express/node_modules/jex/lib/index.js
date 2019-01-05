(function() {
  var Compiler, Input, Lexer, Parser, RT, compile, compileToFunction;

  Input = require('./input');

  Lexer = require('./lexer');

  Parser = require('./parser');

  Compiler = require('./compiler');

  RT = require('./runtime');

  compile = function(str, opts) {
    var c, i, l, p;
    i = new Input(str);
    l = new Lexer(i);
    p = new Parser(l);
    c = new Compiler(opts);
    return c.compile(p.parse());
  };

  compileToFunction = function(str, opts) {
    var c, i, l, p;
    i = new Input(str);
    l = new Lexer(i);
    p = new Parser(l);
    c = new Compiler(opts);
    return c.compileToFunction(p.parse());
  };

  module.exports = {
    Input: Input,
    Lexer: Lexer,
    Parser: Parser,
    RT: RT,
    Compiler: Compiler,
    compile: compile,
    compileToFunction: compileToFunction
  };

}).call(this);
