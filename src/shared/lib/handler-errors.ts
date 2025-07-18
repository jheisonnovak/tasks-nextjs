import { AxiosError } from "axios";
import { IHandleResponseError } from "../interfaces/response";

export const DEFAULT_ERROR_MESSAGES: Record<number, string> = {
	400: "Requisição inválida",
	401: "Autenticação necessária",
	403: "Sem permissão para acessar este recurso",
	404: "Recurso não encontrado",
	405: "Método não permitido",
	408: "Tempo limite excedido",
	409: "Conflito ao processar solicitação",
	422: "Dados inválidos",
	429: "Limite de requisições excedido",
	500: "Erro interno do servidor",
	502: "Erro no gateway",
	503: "Serviço indisponível",
	504: "Tempo limite do gateway",
	0: "Erro de conexão com o servidor",
};

function extractErrorMessage(data: unknown): string | null {
	if (!data || typeof data !== "object") return null;
	const errorData = data as Record<string, unknown>;
	if (typeof errorData.message === "string") return errorData.message;
	if (Array.isArray(errorData.message)) return errorData.message.filter(Boolean).join(". ");
	if (typeof errorData.error === "string") return errorData.error;
	if (typeof errorData.detail === "string") return errorData.detail;
	return null;
}

export function handleGlobalError(error: unknown): IHandleResponseError {
	if (error instanceof AxiosError) {
		const status = error.response?.status ?? 0;
		const customMessage = error.response?.data ? extractErrorMessage(error.response.data) : null;
		const message = customMessage || DEFAULT_ERROR_MESSAGES[status] || error.message;
		return {
			success: false,
			data: {
				message,
				method: error.config?.method,
				url: error.config?.url,
				details: error.response?.data,
			},
			status: status,
		};
	}
	if (error instanceof Error) {
		return {
			success: false,
			data: {
				message: error.message,
				method: undefined,
				url: undefined,
				details: undefined,
			},
			status: 500,
		};
	}
	return {
		success: false,
		data: {
			message: DEFAULT_ERROR_MESSAGES[500],
			method: undefined,
			url: undefined,
			details: undefined,
		},
		status: 500,
	};
}
