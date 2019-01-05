(function() {
  var Input;

  Input = (function() {
    function Input(str, pos) {
      this.str = str;
      this.pos = pos != null ? pos : 0;
      this.len = str.length;
    }

    Input.prototype.hasMore = function() {
      return this.pos < this.len;
    };

    Input.prototype.peek = function(n) {
      var i;
      i = this.pos + n;
      if (i < this.len) {
        return this.str.charAt(i);
      }
    };

    Input.prototype.inc = function() {
      return this.pos++;
    };

    Input.prototype.advance = function(f) {
      var _results;
      _results = [];
      while (this.pos < this.len && f(this.str.charAt(this.pos))) {
        _results.push(this.pos++);
      }
      return _results;
    };

    Input.prototype.get = function() {
      return this.str.substring(this.start, this.pos);
    };

    Input.prototype.save = function() {
      return this.start = this.pos;
    };

    Input.prototype.restore = function() {
      return this.pos = this.start;
    };

    return Input;

  })();

  module.exports = Input;

}).call(this);
