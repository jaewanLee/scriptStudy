module.exports = (args, c) -> 
  throw new Error "'and' needs at least two parameters" if args.length < 2
  "(#{(c.compileNode(a) for a in args).join ' && '})"
