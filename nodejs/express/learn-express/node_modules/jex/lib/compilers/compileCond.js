(function() {
  var compile, compileComplete;

  compileComplete = function(c, pair, args, pos) {
    return "(" + (c.compileNode(pair[0])) + ")?(" + (c.compileNode(pair[1])) + "):(" + (compile(c, args, pos)) + ")";
  };

  compile = function(c, args, pos) {
    var pair;
    if (pos === args.length) {
      return 'undefined';
    }
    pair = args[pos];
    if (!c.isArray(pair) || pair.length < 2) {
      throw new Error("Invalid cond params");
    }
    if (pos === args.length - 1) {
      if (c.isIdentifier(pair[0]) && pair[0].name === 'else') {
        return "" + (c.compileNode(pair[1]));
      } else {
        return compileComplete(c, pair, args, pos + 1);
      }
    } else if (pos === args.length) {
      return 'undefined';
    } else {
      return compileComplete(c, pair, args, pos + 1);
    }
  };

  module.exports = function(args, c) {
    return compile(c, args, 0);
  };

}).call(this);
