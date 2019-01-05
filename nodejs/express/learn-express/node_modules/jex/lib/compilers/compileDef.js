(function() {
  module.exports = function(args, c) {
    if (!c.isIdentifier(args[0])) {
      throw new Error("Definition expects an identifier as first argument");
    }
    return "(" + (c.define(args[0].name, false)) + " = " + (c.compileNode(args[1])) + ")";
  };

}).call(this);
