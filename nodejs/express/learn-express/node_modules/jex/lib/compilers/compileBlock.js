(function() {
  module.exports = function(b, c) {
    var a;
    if (b.length < 1) {
      throw new Error("'block' needs at least one parameters");
    }
    return "(" + (((function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = b.length; _i < _len; _i++) {
        a = b[_i];
        _results.push(c.compileNode(a));
      }
      return _results;
    })()).join(', ')) + ")";
  };

}).call(this);
