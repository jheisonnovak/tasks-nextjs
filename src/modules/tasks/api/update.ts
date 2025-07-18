"use server";

import { ApiResponse, IGlobalMessage } from "../../../shared/interfaces/response";
import { createRequest } from "../../../shared/lib/create-request";
import { TaskStatus } from "../constants/status";

export interface UpdateTaskRequest {
	id: number;
	status: TaskStatus;
}

export const UpdateTask = async (request: UpdateTaskRequest): Promise<ApiResponse<IGlobalMessage>> => {
	return createRequest({ method: "patch", path: `/task/${request.id}`, body: { status: request.status } });
};
