export function doConfig(path: string):ProjectConfig {
    let cfg = require(path);
    return {
        version: !!cfg.version ? cfg.version : null,
        name: !!cfg.name ? cfg.name : null,
        main: !!cfg.main ? cfg.main : null,
        src: !!cfg.src ? cfg.src : "src",
        compile: !!cfg.compile ? {
            to: !!cfg.compile.to ? cfg.compile.to : null,
            with: !!cfg.compile.with ? cfg.compile.with : {}
        } : {
            to: "node",
            with: {}
        }
    }
}

export interface ProjectConfig {
    version: string
    name: string
    main: string,
    src: string,
    compile?: {
        to: "node"|"java"|"go",
        with: {

        }
    }
}
