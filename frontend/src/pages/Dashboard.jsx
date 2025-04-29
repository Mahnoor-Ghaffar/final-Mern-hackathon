import { useState, useEffect, useContext } from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core"
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { restrictToVerticalAxis, restrictToWindowEdges } from "@dnd-kit/modifiers"
import axios from "axios"
import AuthContext from "../context/AuthContext"
import TaskCard from "../components/TaskCard"
import SortableTaskCard from "../components/SortableTaskCard"
import TaskForm from "../components/TaskForm"

const Dashboard = () => {
  const { user } = useContext(AuthContext)
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [activeId, setActiveId] = useState(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("/api/tasks")
        setTasks(res.data)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching tasks:", err)
        setError("Failed to load tasks. Please check your connection and try again.")
        setLoading(false)
      }
    }

    fetchTasks()
  }, [])

  const handleDragStart = (event) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = async (event) => {
    const { active, over } = event

    if (!over) return

    const activeContainer = active.data.current?.sortable?.containerId
    const overContainer = over.data.current?.sortable?.containerId || over.id

    if (activeContainer !== overContainer) {
      const taskId = active.id
      const newStatus = overContainer

      const task = tasks.find((t) => t._id === taskId)
      if (!task) return

      const updatedTasks = tasks.map((t) => (t._id === taskId ? { ...t, status: newStatus } : t))
      setTasks(updatedTasks)

      try {
        await axios.patch(`/api/tasks/${taskId}/move`, { status: newStatus })
      } catch (err) {
        console.error("Error updating task status:", err)
        setTasks(tasks)
        setError("Failed to update task status. Please try again.")
      }
    }

    setActiveId(null)
  }

  const addTask = async (taskData) => {
    try {
      const res = await axios.post("/api/tasks", taskData)
      setTasks([...tasks, res.data])
      setShowTaskForm(false)
    } catch (err) {
      console.error("Error adding task:", err)
      setError("Failed to add task. Please try again.")
    }
  }

  const updateTask = async (id, taskData) => {
    try {
      const res = await axios.put(`/api/tasks/${id}`, taskData)
      setTasks(tasks.map((task) => (task._id === id ? res.data : task)))
      setEditingTask(null)
      setShowTaskForm(false)
    } catch (err) {
      console.error("Error updating task:", err)
      setError("Failed to update task. Please try again.")
    }
  }

  const deleteTask = async (id) => {
    try {
      setTasks(tasks.filter((task) => task._id !== id))
      await axios.delete(`/api/tasks/${id}`)
    } catch (err) {
      fetchTasks()
      setError("Failed to delete task. There might be an issue with the server. Please check the backend logs.")
      if (err.response) {
        console.error("Server response:", err.response.data)
      }
    }
  }

  const fetchTasks = async () => {
    try {
      const res = await axios.get("/api/tasks")
      setTasks(res.data)
    } catch (err) {
      console.error("Error refreshing tasks:", err)
    }
  }

  const handleEditTask = (task) => {
    setEditingTask(task)
    setShowTaskForm(true)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Loading your tasks...</p>
        </div>
      </div>
    )
  }

  const todoTasks = tasks.filter((task) => task.status === "To Do")
  const inProgressTasks = tasks.filter((task) => task.status === "In Progress")
  const doneTasks = tasks.filter((task) => task.status === "Done")

  const activeTask = tasks.find((task) => task._id === activeId)

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Task Board</h1>
            <p className="text-gray-500">Manage your team's work efficiently</p>
          </div>
          <button
            onClick={() => {
              setEditingTask(null)
              setShowTaskForm(true)
            }}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add Task
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Task Form Modal */}
        {showTaskForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="w-full max-w-md">
              <TaskForm
                onSubmit={editingTask ? (data) => updateTask(editingTask._id, data) : addTask}
                onCancel={() => {
                  setShowTaskForm(false)
                  setEditingTask(null)
                }}
                task={editingTask}
              />
            </div>
          </div>
        )}

        {/* Task Board */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* To Do Column */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="bg-gray-50 p-4 border-b border-gray-200">
                <h2 className="font-semibold text-gray-700 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-gray-400"></span>
                  To Do
                  <span className="ml-auto bg-gray-200 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
                    {todoTasks.length}
                  </span>
                </h2>
              </div>
              <div id="To Do" className="p-4 min-h-[300px]">
                <SortableContext
                  items={todoTasks.map((task) => task._id)}
                  strategy={verticalListSortingStrategy}
                  id="To Do"
                >
                  {todoTasks.length === 0 ? (
                    <div className="text-center py-8">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                      <p className="mt-2 text-sm text-gray-500">No tasks to do</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {todoTasks.map((task) => (
                        <SortableTaskCard
                          key={task._id}
                          id={task._id}
                          task={task}
                          onEdit={() => handleEditTask(task)}
                          onDelete={() => deleteTask(task._id)}
                        />
                      ))}
                    </div>
                  )}
                </SortableContext>
              </div>
            </div>

            {/* In Progress Column */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="bg-blue-50 p-4 border-b border-blue-200">
                <h2 className="font-semibold text-gray-700 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-400"></span>
                  In Progress
                  <span className="ml-auto bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-full">
                    {inProgressTasks.length}
                  </span>
                </h2>
              </div>
              <div id="In Progress" className="p-4 min-h-[300px]">
                <SortableContext
                  items={inProgressTasks.map((task) => task._id)}
                  strategy={verticalListSortingStrategy}
                  id="In Progress"
                >
                  {inProgressTasks.length === 0 ? (
                    <div className="text-center py-8">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                      <p className="mt-2 text-sm text-gray-500">No tasks in progress</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {inProgressTasks.map((task) => (
                        <SortableTaskCard
                          key={task._id}
                          id={task._id}
                          task={task}
                          onEdit={() => handleEditTask(task)}
                          onDelete={() => deleteTask(task._id)}
                        />
                      ))}
                    </div>
                  )}
                </SortableContext>
              </div>
            </div>

            {/* Done Column */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="bg-green-50 p-4 border-b border-green-200">
                <h2 className="font-semibold text-gray-700 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-400"></span>
                  Done
                  <span className="ml-auto bg-green-100 text-green-600 text-xs font-medium px-2 py-1 rounded-full">
                    {doneTasks.length}
                  </span>
                </h2>
              </div>
              <div id="Done" className="p-4 min-h-[300px]">
                <SortableContext
                  items={doneTasks.map((task) => task._id)}
                  strategy={verticalListSortingStrategy}
                  id="Done"
                >
                  {doneTasks.length === 0 ? (
                    <div className="text-center py-8">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                      <p className="mt-2 text-sm text-gray-500">No completed tasks</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {doneTasks.map((task) => (
                        <SortableTaskCard
                          key={task._id}
                          id={task._id}
                          task={task}
                          onEdit={() => handleEditTask(task)}
                          onDelete={() => deleteTask(task._id)}
                        />
                      ))}
                    </div>
                  )}
                </SortableContext>
              </div>
            </div>
          </div>

          <DragOverlay>
            {activeId && activeTask ? (
              <div className="opacity-90 transform rotate-2 shadow-xl">
                <TaskCard task={activeTask} onEdit={() => {}} onDelete={() => {}} />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  )
}

export default Dashboard

