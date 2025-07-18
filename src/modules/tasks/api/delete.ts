"use server";

import { ApiResponse, IGlobalMessage } from "../../../shared/interfaces/response";
import { createRequest } from "../../../shared/lib/create-request";

export const DeleteTask = async (taskId: number): Promise<ApiResponse<IGlobalMessage>> => {
	return createRequest({ method: "delete", path: `/task/${taskId}` });
};
