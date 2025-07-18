import { Task } from "../api/find-all";

export const TaskDropList = ({ task, deleteTask }: { task: Task; deleteTask: (id: number) => void }) => (
	<div id={String(task.id)} className="!bg-white !rounded-lg !shadow-md !p-6 !mb-4 cursor-move">
		<div className="flex justify-between items-center">
			<h3 className="text-xl font-semibold text-gray-700">{task.title}</h3>
			<button type="button" className="text-red-400 hover:text-red-500 cursor-pointer" onClick={() => deleteTask(task.id)}>
				<span className="sr-only">Close</span>
				<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</div>
		<p className="mt-3 text-gray-600">{task.description}</p>
	</div>
);
