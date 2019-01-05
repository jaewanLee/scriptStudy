Jex = require '../lib'
assert = require "assert"

describe 'Apply',  ->
  it 'should call user defined function', ->
    f = Jex.compileToFunction '(f 3)'
    res = f (v) -> v + 1
    assert.equal res, 4

describe 'Atomic', ->
  it 'should compile a number', ->
    { code } = Jex.compile '13.234'
    assert.equal code, '13.234'

  it 'should compile a boolean', ->
    { code } = Jex.compile 'false'
    assert.equal code, 'false'
    { code } = Jex.compile 'true'
    assert.equal code, 'true'

  it 'should compile a string', ->
    { code } = Jex.compile '"foobar"'
    assert.equal code, '"foobar"'

  it 'should compile an array', ->
    { code } = Jex.compile ' [ "test"   3.14  true ] '
    assert.equal code, '[ "test", 3.14, true ]'

describe 'Boolean operators', ->
  describe 'or', ->
    it 'should compile logical or operator correctly', ->
      f = Jex.compileToFunction '(or false false)'
      assert.equal f(), false, '(or false false)'
      f = Jex.compileToFunction '(or false true)'
      assert.equal f(), true, '(or false true)'
      f = Jex.compileToFunction '(or true false)'
      assert.equal f(), true, '(or true false)'
      f = Jex.compileToFunction '(or true true)'
      assert.equal f(), true, '(or true true)'
  describe 'short circuit or', ->
    it 'should not evaluate last argument if first is true', ->
      f = Jex.compileToFunction '(or true (f))'
      f () -> throw new Error "or shortcuircuit didnt' work"
  describe 'and', ->
    it 'should compile logical and operator correctly', ->
      f = Jex.compileToFunction '(and false false)'
      assert.equal f(), false, '(and false false)'
      f = Jex.compileToFunction '(and false true)'
      assert.equal f(), false, '(and false true)'
      f = Jex.compileToFunction '(and true false)'
      assert.equal f(), false, '(and true false)'
      f = Jex.compileToFunction '(and true true)'
      assert.equal f(), true, '(and true true)'
  describe 'short circuit and', ->
    it 'should not call second argument if first is false', ->
      f = Jex.compileToFunction '(and false (f))'
      f () -> throw new Error "and shortcuircuit didnt' work"


describe 'Cond', ->
  it 'should work with else expression', ->
    f = Jex.compileToFunction """
      (cond 
        ((eq x 1) 'small')
        ((eq x 2) 'medium')
        (else 'big')
      )
    """
    eq = (a, b) -> a == b
    assert.equal f(eq, 1), 'small'
    assert.equal f(eq, 2), 'medium'
    assert.equal f(eq, 3), 'big'
    assert.equal f(eq, 4), 'big'
    assert.equal f(eq, -1), 'big'

  it 'should work without else expression', ->
    f = Jex.compileToFunction """
      (cond 
        ((eq x 1) 'small')
        ((eq x 2) 'medium')
      )
    """
    eq = (a, b) -> a == b

    assert.equal f(eq, 1), 'small'
    assert.equal f(eq, 2), 'medium'
    assert.equal f(eq, 3), undefined
    assert.equal f(eq, -1), undefined  

describe 'Def', ->
  it 'should compile def correctly', ->
    { code } = Jex.compile '(def x 15)'
    assert.equal code, '(x = 15)'

describe 'Calling defined function', ->
  it 'should call the defined function', ->
    f = Jex.compileToFunction """
      (block
        (def f (func (n) (if (gt n 3) 'big' 'small')))
        (f 4)
      )
    """
    assert.equal (f (a,b) -> a > b), 'big'

describe 'If', ->
  it 'should evaluate to true expression if condition evaluates to true', ->
    f = Jex.compileToFunction '(if true 1 2)'
    assert.equal f(), 1, 'true condition didn\' work'
  it 'should evaluate to else expression if condition evaluates to false', ->
    f = Jex.compileToFunction '(if false 1 2)'
    assert.equal f(), 2, 'false condition didn\' work'
  it 'should work with more comple condition', ->
    f = Jex.compileToFunction  '(if (gt x 10) "big" "small")'
    gt = (a, b) -> a > b
    assert.equal f(gt, 11), 'big'
    assert.equal f(gt, 10), 'small'

describe 'Func', ->
  it 'should call the created function correctly', ->
    f = Jex.compileToFunction '( (func (x y) (or x y)) false true )'
    assert.equal f(), true, 'failure'

describe 'Recursion', ->
  it 'should work with recursive invocation', ->
    f = Jex.compileToFunction """
      (def fibo (func (n) (cond
        ( (eq n 1) 1 )
        ( (eq n 2) 1 )
        ( else (add (fibo (sub n 2)) (fibo (sub n 1))))
      )))
    """

    eq = (a,b) -> a is b
    sub = (a,b) -> a - b
    add = (a,b) -> a + b
    
    fibo = f eq, add, sub

    assert.equal fibo(1), 1
    assert.equal fibo(2), 1
    assert.equal fibo(3), 2
    assert.equal fibo(4), 3
    assert.equal fibo(5), 5
    assert.equal fibo(6), 8
    assert.equal fibo(7), 13

describe 'Variable', ->
  it 'should compile variables correctly', ->
    f = Jex.compileToFunction 'x'
    assert.deepEqual f.argNames, [ 'x' ]
    assert.equal f(3), 3

describe 'User compiler', ->
  it 'should use user defined compiler if given', ->
    f = Jex.compileToFunction '(concat x y "!")',
      compilers:
        concat: (args, c) -> ("#{c.compileNode(a)}" for a in args).join '+'
    assert.equal f('Hello ', 'World'), 'Hello World!'



