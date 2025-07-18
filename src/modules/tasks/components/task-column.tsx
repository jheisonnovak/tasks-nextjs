import { useDroppable } from "@dnd-kit/core";
import { TaskStatus } from "../constants/status";

interface TaskColumnProps {
	title: string;
	children: React.ReactNode;
	status: TaskStatus;
}

const taskColorMap = {
	[TaskStatus.PENDING]: "bg-gray-100",
	[TaskStatus.DOING]: "bg-yellow-100",
	[TaskStatus.DONE]: "bg-blue-100",
};

export const TaskColumn = ({ title, children, status }: TaskColumnProps) => {
	const { setNodeRef, isOver } = useDroppable({
		id: status,
	});

	return (
		<div
			ref={setNodeRef}
			className={`p-4 rounded-lg h-full min-h-[400px] transition-colors ${
				isOver ? "bg-blue-100 border-2 border-blue-300" : `${taskColorMap[status]} border-2 border-gray-200`
			}`}
		>
			<h2 className="text-xl font-bold mb-4">{title}</h2>
			<div className="space-y-4">{children}</div>
		</div>
	);
};
