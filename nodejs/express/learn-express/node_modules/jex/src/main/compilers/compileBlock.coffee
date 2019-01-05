module.exports = (b, c) -> 
  throw new Error "'block' needs at least one parameters" if b.length < 1
  "(#{(c.compileNode(a) for a in b).join ', '})"
