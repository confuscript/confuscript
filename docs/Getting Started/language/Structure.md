# Structure and Classes

Although Confuscript has script in its name, the structure of Confuscript is just a directory of 
.co files which contain imports and 1 class in the root of the file.

Something like this:

```confuscript
import confuscript.Logger

class Main {
    main() {
    
    }
}
```

To run this, in your config you would set the main to `Main.main` Main being the class, main 
being the method (pay attention to your case)
