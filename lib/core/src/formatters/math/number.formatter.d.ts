/**
 * Parse a string to number / float
 * @see http://stackoverflow.com/a/1100653/1465919
 */
export declare const numberFormatter: {
    name: string;
    read(str: string, def: number): number | undefined;
};
