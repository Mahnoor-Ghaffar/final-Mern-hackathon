import { useState, useEffect } from "react";

const TaskForm = ({ onSubmit, onCancel, task, statusOptions }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    status: "To Do", // Default matching backend ("To Do")
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        assignedTo: task.assignedTo || "",
        status: task.status || "To Do",
      });
    }
  }, [task]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">{task ? "Edit Task" : "Create New Task"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={onChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Task title"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={onChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Task description"
            rows="3"
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="assignedTo" className="block text-gray-700 text-sm font-bold mb-2">Assigned To</label>
          <input
            type="text"
            id="assignedTo"
            name="assignedTo"
            value={formData.assignedTo}
            onChange={onChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="User name or ID"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={onChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            {statusOptions ? (
              statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))
            ) : (
              <>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </>
            )}
          </select>
        </div>

        <div className="flex items-center justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {task ? "Update Task" : "Create Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
