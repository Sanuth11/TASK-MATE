import React, { useEffect, useState } from "react";
import axios from "../api";
import { useNavigate } from "react-router-dom";
import "./TaskList.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`/tasks/${userId}`);
        setTasks(res.data);
      } catch (err) {
        console.error("Failed to load tasks", err);
      }
    };
    fetchTasks();
  }, [userId]);

  const handleAddTask = async () => {
    const title = prompt("Enter task title:");
    if (!title) return;

    const priority = prompt("Enter priority (Low, Medium, High):", "Low");
    const deadlineInput = prompt("Enter deadline (YYYY-MM-DD):", "2025-12-31");

    try {
      const newTask = {
        title,
        userId,
        priority: priority || "Low",
        deadline: deadlineInput ? new Date(deadlineInput) : new Date(),
      };
      const res = await axios.post("/tasks", newTask);
      setTasks([...tasks, res.data]);
    } catch (err) {
      alert("Failed to add task");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      alert("Failed to delete task");
    }
  };

  const toggleComplete = async (task) => {
    try {
      const updated = await axios.put(`/tasks/${task._id}`, {
        ...task,
        completed: !task.completed,
      });
      setTasks(tasks.map((t) => (t._id === task._id ? updated.data : t)));
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const handleEdit = async (task) => {
    const newTitle = prompt("Edit title:", task.title);
    const newPriority = prompt("Edit priority (Low, Medium, High):", task.priority);
    const newDeadline = prompt("Edit deadline (YYYY-MM-DD):", task.deadline?.slice(0, 10));

    if (!newTitle) return;

    try {
      const updated = await axios.put(`/tasks/${task._id}`, {
        ...task,
        title: newTitle,
        priority: newPriority,
        deadline: new Date(newDeadline),
      });
      setTasks(tasks.map((t) => (t._id === task._id ? updated.data : t)));
    } catch (err) {
      alert("Failed to edit task");
    }
  };

  return (
    <div className="task-container">
      <div className="task-header">
        <h1>📝 Task Mate</h1>
        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("userId");
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>

      <section>
        <h2 className="section-title">➕ Add a New Task</h2>
        <button className="add-task-btn" onClick={handleAddTask}>
          Add Task
        </button>
      </section>

      <section>
        <h2 className="section-title">📋 Your Tasks</h2>
        {tasks.length === 0 ? (
          <p style={{ color: "#888" }}>No tasks yet. Add one above!</p>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <li
                className={`task-card ${task.completed ? "completed" : ""}`}
                key={task._id}
              >
                <div>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task)}
                  />
                  <strong>{task.title}</strong>
                  <div className="task-details">
                    Priority: {task.priority} | Deadline:{" "}
                    {new Date(task.deadline).toLocaleDateString()} | Status:{" "}
                    {task.completed ? "✅ Completed" : "⏳ Pending"}
                  </div>
                </div>
                <div>
                  <button className="edit-btn" onClick={() => handleEdit(task)}>
                    ✏️ Edit
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(task._id)}>
                    ❌ Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default TaskList;
