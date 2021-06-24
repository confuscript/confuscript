# `@confuscript/parser`

This is the Confuscript parser. It also contains the indexer.

The parser is what you would think it is, however the indexer is a class which indexes the whole of the parsed AST and creates an object names that correspond to an index in the AST. This is used by the compiler to easily find where something exists when Confuscript code calls it. For example, if you write `Logger.Info("hello")` instead of the compiler looping over the whole AST to fin the Logger class and Info method, it checks with the indexer if there is a key called Logger and a key called Info inside that and now it knows all about it.
