(function() {
  module.exports = function(args, c) {
    var a;
    if (args.length < 2) {
      throw new Error("'or' needs at least two parameters");
    }
    return "(" + (((function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = args.length; _i < _len; _i++) {
        a = args[_i];
        _results.push(c.compileNode(a));
      }
      return _results;
    })()).join(' || ')) + ")";
  };

}).call(this);
