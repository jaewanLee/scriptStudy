module.exports = (args, c) -> 
  throw new Error "'fun' needs at least two arguments" if args.length < 2
  throw new Error "'fun' expects first parameter to be an array of identifiers" if not c.isIdArray args[0]
  output = []
  c.pushScope()
  c.define n.name, true for n in args[0]
  output.push "(function(#{(n.name for n in args[0]).join ', '}) { "
  output.push '' # slot for local variable definitions
  output.push "return #{c.compileNode args[1]}; })"
  locals = c.getLocals()
  if locals.length > 0
    output[1] = "var #{(n for n in locals).join ', '}; "
  c.popScope()
  output.join ''
