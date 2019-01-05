module.exports = (args, c) -> 
  throw new Error "function application needs at least one parameter (the function itself)" if args.length < 1
  "#{c.compileNode(args[0])}(#{(c.compileNode(a) for a in args[1..]).join ', '})"
