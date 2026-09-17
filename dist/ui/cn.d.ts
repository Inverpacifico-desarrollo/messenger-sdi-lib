export type ClassValue = string | number | boolean | undefined | null | {
    [key: string]: boolean | undefined | null;
} | ClassValue[];
export declare function cn(...inputs: ClassValue[]): string;
