export declare const setCacheStorage: (key: string, value: string, expiryTime: number) => Promise<{
    status: string;
    message: string;
    data?: undefined;
} | {
    status: string;
    data: unknown;
    message?: undefined;
}>;
export declare const setEncrypytedCacheStorage: (key: string, value: string, expiryTime: number, secretPass: string) => Promise<{
    status: string;
    message: string;
    data?: undefined;
} | {
    status: string;
    data: unknown;
    message?: undefined;
}>;
export declare const getCacheStorage: (key: string) => Promise<{
    status: string;
    message: string;
    data: any;
} | {
    status: string;
    data: unknown;
    message?: undefined;
}>;
export declare const getEncrypytedCacheStorage: (key: string, secretPass: string) => Promise<{
    status: string;
    message: string;
    data: any;
} | {
    status: string;
    data: unknown;
    message?: undefined;
}>;
export declare const deleteCacheStorage: () => Promise<{
    status: string;
    message: string;
    data: any;
} | {
    status: string;
    data: unknown;
    message?: undefined;
}>;
export declare const deleteCacheStorageById: (id: string) => Promise<{
    status: string;
    message: string;
    data: any;
} | {
    status: string;
    data: unknown;
    message?: undefined;
}>;
