import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todoList: JSON.parse(localStorage.getItem("todoList")) || [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.todoList.push({
        taskName: action.payload.taskName,
        checked: false,
        priority: action.payload.priority === "on" ? true : false, // Convert priority to boolean
        id: Date.now(), // Unique ID for each task
      });
    },
    toggleTaskChecked: (state, action) => {
      const task = state.todoList.find((task) => task.id === action.payload);
      if (task) {
        task.checked = !task.checked;
      }
    },
    toggleTaskPriority: (state, action) => {
      const taskPriority = state.todoList.find(
        (task) => task.id === action.payload
      );
      if (taskPriority) {
        taskPriority.priority = !taskPriority.priority;
      }
    },
    deleteTask: (state, action) => {
      state.todoList = state.todoList.filter(
        (task) => task.id !== action.payload
      );
    },
    clearTasks: (state) => {
      state.todoList = [];
      localStorage.removeItem("todoList");
    },
  },
});

export default todoSlice.reducer;
export const {
  addTask,
  toggleTaskChecked,
  toggleTaskPriority,
  deleteTask,
  clearTasks,
} = todoSlice.actions;
