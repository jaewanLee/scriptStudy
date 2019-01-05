(function() {
  module.exports = function(args, c) {
    var a;
    if (args.length < 1) {
      throw new Error("function application needs at least one parameter (the function itself)");
    }
    return "" + (c.compileNode(args[0])) + "(" + (((function() {
      var _i, _len, _ref, _results;
      _ref = args.slice(1);
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        a = _ref[_i];
        _results.push(c.compileNode(a));
      }
      return _results;
    })()).join(', ')) + ")";
  };

}).call(this);
