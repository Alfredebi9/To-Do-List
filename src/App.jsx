import Header from "./Header";
import Input from "./Input";
import DisplayTask from "./DisplayTask";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PriorityView from "./PriorityView";
import { clearTasks } from "./todoSlice";

export default function App() {
  const { todoList } = useSelector((state) => state.todo);
  const [filter, setFilter] = useState("all");

  const tasksLeft = todoList.filter((task) => !task.checked).length;
  const dispatch = useDispatch();

  // 2. Filter tasks based on filter state
  const filteredTasks = todoList.filter((task) => {
    if (filter === "active") return !task.checked;
    if (filter === "completed") return task.checked;
    return true;
  });

  const handleClear = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear all tasks?"
    );
    if (confirmClear) {
      dispatch(clearTasks());
      localStorage.removeItem("todoList");
      setFilter("all");
    }
  };

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="">
      <Header />
      <Input />
      <div className="flex gap-4 px-4 py-6">
        <ul className="flex flex-col gap-4 w-1/2 ">
          <DisplayTask tasks={filteredTasks} />
        </ul>
        <div className="w-px bg-gray-950 mx-2"></div>
        <PriorityView />
      </div>
      <div className="flex justify-between px-4 pt-4 pb-6 font-semibold shadow-md bg-amber-900">
        <p className="text-white"> ↓ Filters: </p>
        <select
          className={`border-2 border-purple-500 p-1.5 text-purple-600 ${
            todoList.length <= 0 ? "" : "cursor-pointer"
          }`}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          disabled={todoList.length <= 0}
        >
          <option value={"all"}>All</option>
          <option value={"active"}>Active</option>
          <option value={"completed"}>Completed</option>
        </select>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 px-4 py-6 shadow-md bg-stone-700 text-white">
        {tasksLeft > 0 ? (
          <p>
            {tasksLeft} task{tasksLeft !== 1 ? "s" : ""} left
          </p>
        ) : (
          <p>No task. Input task</p>
        )}
        <button
          onClick={handleClear}
          className="cursor-pointer p-4 px-8 transition-colors rounded-lg bg-red-600 hover:bg-red-500"
        >
          Clear Task
        </button>
      </div>
    </div>
  );
}
