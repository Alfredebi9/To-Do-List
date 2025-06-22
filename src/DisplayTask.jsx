import { useDispatch, useSelector } from "react-redux";
import { deleteTask, toggleTaskChecked, toggleTaskPriority } from "./todoSlice";

function DisplayTask({ tasks }) {
  const dispatch = useDispatch();
  const { todoList } = useSelector((state) => state.todo);

  if (todoList.length === 0) {
    return (
      <div className="flex items-center justify-center px-4 py-5">
        <p className="text-lg text-stone-500">No tasks available</p>
      </div>
    );
  }

  return tasks.map((task) => (
    <li key={task.id} className="flex items-center gap-4 px-4 py-5">
      <input
        type="checkbox"
        checked={task.checked}
        onChange={() => dispatch(toggleTaskChecked(task.id))}
      />
      <p className="capitalize">{task.taskName}</p>
      <div className="flex items-center gap-2 ml-auto">
        <button
          className="px-4 py-2 bg-stone-700 rounded-lg shadow-md hover:bg-stone-600 transition-colors duration-300 cursor-pointer"
          onClick={() => {
            const confirmDelete = window.confirm(
              `Are you sure you want to remove this task of id: ${task.id}?`
            );
            if (confirmDelete) {
              dispatch(deleteTask(task.id));
            }
          }}
        >
          <span className={`text-sm text-white`}>Delete</span>
        </button>
        <button
          className=" px-4 py-2 bg-stone-700 rounded-lg shadow-md hover:bg-stone-600 transition-colors duration-300 cursor-pointer"
          onClick={() => dispatch(toggleTaskPriority(task.id))}
        >
          <span
            className={`text-sm ${
              task.priority ? "text-red-500" : "text-green-600"
            }`}
          >
            {task.priority ? "Remove Priority" : "Add Priority"}
          </span>
        </button>
      </div>
    </li>
  ));
}

export default DisplayTask;
