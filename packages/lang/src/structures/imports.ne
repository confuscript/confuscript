@lexer lexer

@include "../util/spaces.ne"

import -> "import" _ %word moreimport:+  {% (d) => ({type: "import", path: [d[2].value, ...(d[3].map(x => x.value))]}) %}

moreimport -> _:? "." _:? %word {% d => d[3] %}