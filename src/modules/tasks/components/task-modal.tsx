import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { IResponse } from "../../../shared/interfaces/response";
import { CreateTask } from "../api/create";
import { useTaskForm } from "../hooks/task-form.hook";

export const TaskModal = ({ isOpen, setIsOpen, onSuccess }: { isOpen: boolean; setIsOpen: (isOpen: boolean) => void; onSuccess: () => void }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useTaskForm();

	const createTaskMutation = useMutation({
		mutationFn: CreateTask,
		onSuccess: async (data: IResponse) => {
			toast.dismiss();
			toast.success(data.message);
			reset();
			onSuccess();
			setIsOpen(false);
		},
		onError: error => {
			toast.dismiss();
			toast.error("Error creating task");
			console.error("Error creating task:", error);
		},
	});

	if (!isOpen) return null;

	return (
		<div className="bg-black/40 fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
			<div className="relative z-10 w-full max-w-lg p-6 mx-auto bg-white rounded-lg shadow-xl">
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-lg font-medium">Create New Task</h3>
					<button type="button" className="text-gray-400 hover:text-gray-500 cursor-pointer" onClick={() => setIsOpen(false)}>
						<span className="sr-only">Close</span>
						<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				<form onSubmit={handleSubmit(data => createTaskMutation.mutate(data))} className="w-full space-y-6 bg-white rounded-lg p-8">
					<div className="space-y-2">
						<label htmlFor="title" className="block text-sm font-medium text-gray-700">
							Title
						</label>
						<input
							type="text"
							{...register("title")}
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder:text-gray-400"
							placeholder="Enter task title"
						/>
						{errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
					</div>

					<div className="space-y-2">
						<label htmlFor="description" className="block text-sm font-medium text-gray-700">
							Description
						</label>
						<textarea
							{...register("description")}
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder:text-gray-400"
							placeholder="Enter task description"
						></textarea>
					</div>

					<div className="flex gap-4 pt-4">
						<button
							type="submit"
							className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200 cursor-pointer"
						>
							Create Task
						</button>
						<button
							type="button"
							onClick={() => setIsOpen(false)}
							className="px-6 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
