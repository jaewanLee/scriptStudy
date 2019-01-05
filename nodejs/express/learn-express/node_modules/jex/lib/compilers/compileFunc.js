(function() {
  module.exports = function(args, c) {
    var locals, n, output, _i, _len, _ref;
    if (args.length < 2) {
      throw new Error("'fun' needs at least two arguments");
    }
    if (!c.isIdArray(args[0])) {
      throw new Error("'fun' expects first parameter to be an array of identifiers");
    }
    output = [];
    c.pushScope();
    _ref = args[0];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      n = _ref[_i];
      c.define(n.name, true);
    }
    output.push("(function(" + (((function() {
      var _j, _len1, _ref1, _results;
      _ref1 = args[0];
      _results = [];
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        n = _ref1[_j];
        _results.push(n.name);
      }
      return _results;
    })()).join(', ')) + ") { ");
    output.push('');
    output.push("return " + (c.compileNode(args[1])) + "; })");
    locals = c.getLocals();
    if (locals.length > 0) {
      output[1] = "var " + (((function() {
        var _j, _len1, _results;
        _results = [];
        for (_j = 0, _len1 = locals.length; _j < _len1; _j++) {
          n = locals[_j];
          _results.push(n);
        }
        return _results;
      })()).join(', ')) + "; ";
    }
    c.popScope();
    return output.join('');
  };

}).call(this);
