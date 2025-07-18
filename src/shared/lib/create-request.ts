import { AxiosRequestConfig, Method } from "axios";
import { apiInstance } from "../api/config";
import { ApiResponse } from "../interfaces/response";
import { handleGlobalError } from "./handler-errors";

export interface ICreateRequest<TRequest = unknown> extends Omit<AxiosRequestConfig, "url" | "method" | "data"> {
	path: string;
	method: Method;
	body?: TRequest;
}

const requestFactory =
	(instance: typeof apiInstance) =>
	async <TSuccess, TRequest = unknown>(params: ICreateRequest<TRequest>): Promise<ApiResponse<TSuccess>> => {
		try {
			const { path, method, body, headers, ...rest } = params;
			const requestHeaders = body instanceof FormData ? { ...headers, "Content-Type": "multipart/form-data" } : headers;

			const { data, status } = await instance.request<TSuccess>({
				url: path,
				method,
				data: body,
				headers: requestHeaders,
				...rest,
			});
			return { success: true, data, status };
		} catch (error: unknown) {
			return handleGlobalError(error);
		}
	};

export const createRequest = requestFactory(apiInstance);
