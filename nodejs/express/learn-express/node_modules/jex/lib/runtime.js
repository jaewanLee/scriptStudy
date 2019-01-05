(function() {
  var Identifier, getIdName, identifier, isIdentifier;

  Identifier = (function() {
    function Identifier(name) {
      this.name = name;
    }

    return Identifier;

  })();

  identifier = function(name) {
    return new Identifier(name);
  };

  isIdentifier = function(v) {
    return v instanceof Identifier;
  };

  getIdName = function(id) {
    return id.name;
  };

  module.exports = {
    identifier: identifier,
    isIdentifier: isIdentifier,
    getIdName: getIdName
  };

}).call(this);
