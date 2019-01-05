jex
===

Jex is a transpiler that transforms Scheme like programming language to javascript code.

Jex is implemented in Coffee Script.

Usage example (in coffee script)
================================

    Jex = require 'jex'

    console.log Jex.compile """
      (block
        (def f (func (x) (if (gt x 1000) "big number" "small number")))
        (f 50)
      )
    """

Jex.compile will return an object that contains the compiled code as string and array of variables
the code uses, but not defines itself. It also returns locally defined variables.

    { 
        code: '((f = (function(x) { return (gt(x, 1000))?("big number"):("small number"); })), f(50))',
        refs: [ 'gt' ],
        locals: [ 'f' ] 
    }

If you want a callable javascript function instead of a code text, call `Jex.compileToFunction`. It
will return a javascript function object extended with field `argNames` which has same content
than the `refs` (see `Jex.compile` above).

Application defined compilers
=============================
Application can define its own compiler. Example:

    f = Jex.compileToFunction '(concat x y "!")',
      compilers:
        concat: (args, c) -> ("#{c.compileNode(a)}" for a in args).join '+'

    assert.equal f('Hello ', 'World'), 'Hello World!'

The 'concat' is not a builtin, but here the application defines a compiler for it. 

Compiler function is given the source arguments and the compiler object. Compiler 
function can call `compileNode`-method to compile the arguments if necessary.

Source syntax
=============

    exp -> list | atomic
    list -> '(' exp+ ')'
    atomic -> true | false | number | string | identifier

Apply
=====
If first item in a list is an identifier and its value equals to one of the compiler 
builtins (below), then it apply is compiled with corresponding builtin compiler. 
Otherwise it is compiled as a user function invocation.

Supported compiler builtins
===========================

array
----- 
An array. 

    (array 2 3 4)

There is also a syntactic helper for this: `[ 2 3 4 ]`

and
---
Logical and (&&)

    (and false true)

or
---
Logical or (||)

    (or false true)

block
-----
List of expressions. Value of a block is the value of the last expression.

    (block x y z)

def
---
Variable definition

    (def x 3)

func
----
A function closure (lamda)

    (def mul2 (func (x) (mul 2 x)))

if
---
If expression

    (if (lt x 2) (add x 2) x)


cond
---
Cond expression

    (cond (exp1 value1) (exp2 value2) ... )

Last exp can be an else expression in case of which it is used when
none of the expressions before match. Example:

    (cond ((eq x 1) 'one') ((eq x 2) 'two') (else 'something else'))


 