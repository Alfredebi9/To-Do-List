import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "./todoSlice";

function Input() {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState(false);
  const dispatch = useDispatch();

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    //send task details to array
    dispatch(addTask({ taskName: text, priority })); 
    setText("");
    setPriority(false); 
  };
  return (
    <form className="flex flex-col justify-between gap-4 px-4 py-6 shadow-md bg-stone-700">
      <input
        type="text"
        className="w-11/12 px-4 py-2 mx-auto bg-white rounded-lg shadow-md h-15 text-amber-700 focus:outline-none caret-amber-500"
        value={text}
        placeholder="Add a new task"
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex items-center gap-4 mx-4">
        <label className="text-white">
          <span className="text-amber-500">Mark as priority</span>
        </label>
        <input
          type="checkbox"
          className="w-6 px-4 py-2 bg-white rounded-lg shadow-md h-15 text-amber-700 focus:outline-none caret-amber-500"
          checked={priority}
          onChange={(e) => setPriority(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          type="submit"
          className="p-4 px-8 text-white transition-colors rounded-lg cursor-pointer duration-600 bg-amber-900 hover:bg-amber-800"
        >
          &#x2795; Add
        </button>
      </div>
    </form>
  );
}

export default Input;
