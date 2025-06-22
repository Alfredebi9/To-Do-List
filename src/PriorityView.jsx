import { useDispatch, useSelector } from "react-redux";
import { toggleTaskChecked } from "./todoSlice";

function PriorityView() {
  const task = useSelector((state) => state.todo.todoList);
  const dispatch = useDispatch();

  return (
    <div>
      <h2 className="font-bold">Priority</h2>
      <p className="text-sm text-gray-500">
        Tasks marked as priority will appear here.
      </p>
      <div className="flex flex-col gap-4 px-4 py-6"></div>
      {task
        .filter((task) => task.priority)
        .map((task) =>
          task.priority ? (
            <div key={task.id} className="flex items-center gap-4 px-4 py-5">
              <input
                type="checkbox"
                checked={task.checked}
                onChange={() => dispatch(toggleTaskChecked(task.id))}
              />
              <p className="capitalize">{task.taskName}</p>
              <span className="text-green-500">Priority</span>
            </div>
          ) : (
            "No priority tasks available"
          )
        )}
    </div>
  );
}

export default PriorityView;
