import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice"; 
import { authApi } from "@/features/api/authApi";
import { taskApi } from "@/features/api/taskApi";
// import { courseApi } from "@/features/api/courseApi";
// import { purchaseApi } from "@/features/api/purchaseApi";
// import { courseProgressApi } from "@/features/api/courseProgressApi";

const rootRedcuer = combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer, 
    // [courseApi.reducerPath]:courseApi.reducer,
    // [purchaseApi.reducerPath]:purchaseApi.reducer,
    // [courseProgressApi.reducerPath]:courseProgressApi.reducer,
    auth:authReducer, 
});
export default rootRedcuer;