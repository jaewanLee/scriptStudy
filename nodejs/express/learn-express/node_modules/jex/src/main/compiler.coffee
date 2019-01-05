{ isIdentifier }  = require './runtime'

compilers =
  'apply':  require './compilers/compileApply'
  'var':    require './compilers/compileVar'
  'array':  require './compilers/compileArray'
  'and':    require './compilers/compileAnd'
  'block':  require './compilers/compileBlock'
  'def':    require './compilers/compileDef'
  'func':   require './compilers/compileFunc'
  'if':     require './compilers/compileIf'
  'cond':   require './compilers/compileCond'
  'or':     require './compilers/compileOr'

module.exports = class Compiler
  constructor: (@opts = {}) ->
    @opts.compilers ?= {}

  # pushes a new function score. Function score stores
  # information about what variables are defined in
  # the function and what variables are referenced
  pushScope: () -> @scopes.push { defs: {}, refs: {} }

  # Leaves a function score. Goes through the referenced variables
  # and marks down names that were used bu not defined in the
  # local scope into the globals object
  popScope: () -> 
    for name, isLocal of @scopes[@scopes.length-1].refs when not isLocal
      @globals[name] = true
    @scopes.pop()
    
  # Defines a variable in current scope. Throws an error if variable
  # is re-defined. This is used to define the function arguments 
  # (isArg is true) and variables defined inside the 
  # function body (isArg is false)
  define: (name, isArg) -> 
    if @scopes[@scopes.length-1].defs[name]?
      throw new Error "Re-definition of variable #{name}"
    @scopes[@scopes.length-1].defs[name] = isArg
    name

  globalAccess: (name) -> 
    if typeof @opts.global is 'function'
      @opts.global name
    else
      name

  # Marks a use of variable. If variable name is not found in
  # any of the scopes, it is marked as global
  ref: (name) -> 
    if @isDefined name
      @scopes[@scopes.length-1].refs[name] = true
      name
    else
      @scopes[@scopes.length-1].refs[name] = false
      @globalAccess name

  # Returns true if variable is defined in any of the scopes
  isDefined: (name) ->
    l = s = @scopes.length - 1
    while s >= 0
      return true if @scopes[s--].defs[name]?
    false

  # Get all variables that were defined (local variables, except function arguments)
  getLocals: () -> (name for name, isArg of @scopes[@scopes.length-1].defs when not isArg)

  # Checks that a is an array that contains only identifiers
  isIdArray: (a) ->
    return false if not @isArray a
    for v in a
      return false if not @isIdentifier v 
    true

  isArray: (a) -> typeof a is 'object' and a.constructor is Array

  isIdentifier: (v) -> isIdentifier v

  compileApply: (arr) ->
    if @isIdentifier arr[0]
      compiler = compilers[arr[0].name] or @opts.compilers[arr[0].name]
      return compiler arr[1..], @ if compiler?
    compilers['apply'] arr, @

  compileNode: (node) ->
    return 'null' if node is null
    return compilers['var'] node.name, @ if @isIdentifier node
    if @isArray node
      @compileApply node
    else
      JSON.stringify node

  compile: (node) ->
    # Reset the scopes and globals
    @scopes = []    
    @globals = {}

    # Push initial scope
    @pushScope()

    # Actual compile
    code = @compileNode node

    locals = @getLocals()

    # Pop the scope so that globals gets populated
    @popScope()

    # Return an object containing the code as a string, and all the variables
    # that were referenced by the code
    { code, refs: (name for name, _ of @globals), locals }

  compileToFunction: (node) ->
    { code, refs, locals }  = @compile node

    localVar = 
      if locals.length > 0
        "var #{(n for n in locals).join ', '}; "
      else
        ''

    # Create a function object. All variables that were referenced
    # by the code are put as arguments.
    f = new Function refs, "#{localVar}return #{code};"

    # Let's put the arguments name to function object in case 
    # the caller needs to know them
    f.argNames = refs
    f

