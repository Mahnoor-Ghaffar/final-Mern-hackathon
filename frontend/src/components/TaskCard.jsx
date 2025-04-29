const TaskCard = ({ task, onEdit, onDelete }) => {
  const statusColors = {
    'To Do': "bg-gray-100 text-gray-800",
    'In Progress': "bg-blue-100 text-blue-800",
    'Done': "bg-green-100 text-green-800",
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs px-2 py-1 rounded-full ${statusColors[task.status] || statusColors['To Do']}`}>
              {task.status || 'To Do'}
            </span>
            <h3 className="font-semibold text-gray-900 truncate">{task.title}</h3>
          </div>

          {task.description && (
            <p className="text-gray-600 text-sm mt-2 line-clamp-2">
              {task.description}
            </p>
          )}

          <div className="mt-3 flex items-center text-sm text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {task.assignedTo || "Unassigned"}
          </div>
        </div>

        <div className="flex space-x-1">
          <button 
            onClick={onEdit} 
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
            title="Edit"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button 
            onClick={onDelete} 
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
            title="Delete"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;

