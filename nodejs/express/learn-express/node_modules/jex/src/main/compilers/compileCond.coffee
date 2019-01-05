compileComplete = (c, pair, args, pos) ->
  "(#{c.compileNode pair[0]})?(#{c.compileNode pair[1]}):(#{compile c, args, pos})"  

compile = (c, args, pos) ->
  return 'undefined' if pos is args.length
  pair = args[pos]
  throw new Error "Invalid cond params" if not c.isArray(pair) or pair.length < 2

  # last item in the args (might be an else)
  if pos is args.length - 1
    if c.isIdentifier(pair[0]) and pair[0].name is 'else'
      "#{c.compileNode pair[1]}"
    else
      compileComplete c, pair, args, pos+1  
  else if pos is args.length
    'undefined'
  else
    compileComplete c, pair, args, pos+1

module.exports = (args, c) -> compile c, args, 0
