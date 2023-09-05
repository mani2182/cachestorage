export function getAllRecords(): Promise<{
    status: string;
    message: string;
    data: unknown;
}>;
export function getRecordById(_id: any): Promise<{
    status: string;
    message: string;
    data: any;
}>;
export function storeInCache(_id: any, _response: any, _timestamp: any): Promise<{
    status: string;
    message: string;
    data: unknown;
}>;
export function isValidCache(_id: any): Promise<{
    status: string;
    message: string;
    data: any;
}>;
export function deleteAllRecords(): Promise<unknown>;
export function deleteRecordById(_id: any): Promise<"success" | "failed">;
