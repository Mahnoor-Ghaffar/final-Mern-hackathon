import {configureStore} from "@reduxjs/toolkit" 
import rootRedcuer from "./rootRedcuer";
import { authApi } from "@/features/api/authApi";
import { taskApi } from "@/features/api/taskApi";
// import { courseApi } from "@/features/api/courseApi";
// import { purchaseApi } from "@/features/api/purchaseApi";
// import { courseProgressApi } from "@/features/api/courseProgressApi";

export const appStore = configureStore({
    reducer: rootRedcuer,
    middleware:(defaultMiddleware) => defaultMiddleware().concat(authApi.middleware).concat(taskApi.middleware),
});

const initializeApp = async () => {
    await appStore.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch:true}))
}
initializeApp();

