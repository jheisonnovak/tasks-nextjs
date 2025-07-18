interface IHandleResponse<T> {
	success: boolean;
	data: T;
	status: number;
}

export interface IHandleErrorData {
	message: string;
	method?: string;
	url?: string;
	details?: unknown;
}

export interface IHandleResponseSuccess<T> extends IHandleResponse<T> {
	success: true;
}

export interface IHandleResponseError extends IHandleResponse<IHandleErrorData> {
	success: false;
}

export type ApiResponse<T> = IHandleResponseSuccess<T> | IHandleResponseError;

export interface IGlobalMessage {
	message: string;
}
