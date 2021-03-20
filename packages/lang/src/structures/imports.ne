@lexer lexer

@include "../util/spaces.ne"

import -> "import" _ moreimport:+ %word {% (d) => ({type: "import", path: [...d[2], d[3]]}) %}

moreimport -> %word "." {% initial %}