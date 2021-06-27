export interface Index {
    [dotpath: string]: {
        mainclass: keyof Index[string]["classes"];
        classes: {
            [classname: string]: {
                index: number;
                vars: {
                    [name: string]: number;
                };
                methods: {
                    [name: string]: number;
                };
            };
        };
    };
}
