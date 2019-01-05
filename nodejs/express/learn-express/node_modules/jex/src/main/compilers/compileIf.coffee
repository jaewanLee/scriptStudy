module.exports = (args, c) -> 
  throw new Error "'if' needs at least three parameters" if args.length < 3
  "((#{c.compileNode(args[0])})?(#{c.compileNode(args[1])}):(#{c.compileNode(args[2])}))"
