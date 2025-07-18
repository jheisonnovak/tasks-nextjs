"use server";

import { ApiResponse } from "../../../shared/interfaces/response";
import { createRequest } from "../../../shared/lib/create-request";
import { TaskStatus } from "../constants/status";

export interface Task {
	id: number;
	title: string;
	description: string;
	status: TaskStatus;
}

export const FindAllTasks = async (): Promise<ApiResponse<Task[]>> => {
	return createRequest({ method: "get", path: "/task" });
};
