export interface Response<T>{
    result: T;
    message: string;
    status: boolean;
}