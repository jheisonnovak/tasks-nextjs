import { useDraggable } from "@dnd-kit/core";
import { Task } from "../api/find-all";

interface TaskDropListProps {
	task: Task;
	deleteTask: (id: number) => void;
}

export const TaskDropList = ({ task, deleteTask }: TaskDropListProps) => {
	const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
		id: task.id,
	});

	const style = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
				transition: isDragging ? "none" : "transform 0.2s ease-out",
				zIndex: isDragging ? 1000 : 1,
		  }
		: {
				transition: "transform 0.2s ease-out",
		  };

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...listeners}
			{...attributes}
			className={`bg-white rounded-lg shadow-md p-6 cursor-move transition-all ${isDragging ? "opacity-50 shadow-lg scale-105" : "hover:shadow-lg"}`}
		>
			<div className="flex justify-between items-center">
				<h3 className="text-xl font-semibold text-gray-700">{task.title}</h3>
				<button
					type="button"
					className="text-red-400 hover:text-red-500 cursor-pointer z-10"
					onClick={e => {
						e.stopPropagation();
						deleteTask(task.id);
					}}
				>
					<span className="sr-only">Close</span>
					<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
			<p className="mt-3 text-gray-600">{task.description}</p>
		</div>
	);
};
