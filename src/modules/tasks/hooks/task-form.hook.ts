import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export const createTaskSchema = z.object({
	title: z.string().min(1, "Title is required"),
	description: z.string().optional(),
});

export type CreateTaskFormData = z.infer<typeof createTaskSchema>;

export const useTaskForm = () => {
	const form = useForm<CreateTaskFormData>({
		resolver: zodResolver(createTaskSchema),
	});

	return form;
};
