import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const TASK_API = `${import.meta.env.VITE_BACKEND_URL}/api/tasks/`;

export const taskApi = createApi({
    reducerPath: "taskApi",
    baseQuery: fetchBaseQuery({
        baseUrl: TASK_API,
        credentials: "include",
    }),
    endpoints: (builder) => ({
        // Create Task
        createTask: builder.mutation({
            query: (inputData) => ({
                url: "",
                method: "POST",
                body: inputData,
            }),
        }),
        // Get All Tasks
        getAllTasks: builder.query({
            query: (params) => {
                const queryString = params
                    ? `?${new URLSearchParams(params).toString()}`
                    : "";
                return {
                    url: `${queryString}`,
                    method: "GET",
                };
            },
        }),
        // Get Task by ID
        getTaskById: builder.query({
            query: (taskId) => ({
                url: `${taskId}`,
                method: "GET",
            }),
        }),
        // Update Task
        updateTask: builder.mutation({
            query: ({ taskId, inputData }) => ({
                url: `${taskId}`,
                method: "PUT",
                body: inputData,
            }),
        }),
        // Delete Task
        deleteTask: builder.mutation({
            query: (taskId) => ({
                url: `${taskId}`,
                method: "DELETE",
            }),
        }),
        // Move Task (status change)
        moveTask: builder.mutation({
            query: ({ taskId, newStatus }) => ({
                url: `${taskId}/move`,
                method: "PATCH",
                body: { newStatus },
            }),
        }),
    }),
});

export const {
    useCreateTaskMutation,
    useGetAllTasksQuery,
    useGetTaskByIdQuery,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
    useMoveTaskMutation,
} = taskApi;
