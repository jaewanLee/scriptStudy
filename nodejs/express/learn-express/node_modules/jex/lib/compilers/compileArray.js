(function() {
  module.exports = function(arr, c) {
    var a;
    return "[ " + (((function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = arr.length; _i < _len; _i++) {
        a = arr[_i];
        _results.push(c.compileNode(a));
      }
      return _results;
    })()).join(', ')) + " ]";
  };

}).call(this);
