(function() {
  module.exports = function(args, c) {
    if (args.length < 3) {
      throw new Error("'if' needs at least three parameters");
    }
    return "((" + (c.compileNode(args[0])) + ")?(" + (c.compileNode(args[1])) + "):(" + (c.compileNode(args[2])) + "))";
  };

}).call(this);
