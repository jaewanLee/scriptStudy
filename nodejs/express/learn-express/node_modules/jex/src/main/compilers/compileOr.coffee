module.exports = (args, c) -> 
  throw new Error "'or' needs at least two parameters" if args.length < 2
  "(#{(c.compileNode(a) for a in args).join ' || '})"