WJS-LPA: fixed-arity LPA implemented in "Whitney JS" style

- LPA: this is derived from APL, but evaluates from left to right. this means monadic application is postfix rather than prefix, and monadic modifiers are prefix rather than postfix.
- fixed-arity: similar to my larger project [FIXAPL](https://fixapl.netlify.app), each function here has a statically-determined arity/adicity/argument count, which influences train rules. also similar to Jelly.
- WJS/"Whitney JS": Arthur Whitney is known for, among many other things, his peculiar style of writing C code. see the [Incunabulum](https://code.jsoftware.com/wiki/Essays/Incunabulum) for a taste. I always found this style fascinating and, though I don't think I will use it again in another large project, have found it pretty fun to try and emulate through JavaScript here. it doesn't map one to one since Whitney C relies so heavily on preprocessor macros which JS doesn't have, but I think it's close enough. I've written a lot of this on my phone so I've been making sure not to have any lines longer than 70 or so characters.

this project is in an early stage! the parser is fully functional but the interpreter is not so!

the language uses the flat array model. currently the only array types are character and number. currently the only built-in function available is `+` to add two arrays of numbers.

do whatever you want with the code, just leave the author notice at the top!
