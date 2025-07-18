"use server";

import { ApiResponse, IGlobalMessage } from "../../../shared/interfaces/response";
import { createRequest } from "../../../shared/lib/create-request";
import { CreateTaskFormData } from "../hooks/task-form.hook";

export const CreateTask = async (task: CreateTaskFormData): Promise<ApiResponse<IGlobalMessage>> => {
	return createRequest({ method: "post", path: "/task", body: task });
};
