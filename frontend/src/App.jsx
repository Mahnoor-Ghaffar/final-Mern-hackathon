import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import HeroSection from "./pages/student/HeroSection";
import MainLayout from "./layout/MainLayout";
// import Courses from "./pages/student/Courses";
import MyLearning from "./pages/student/MyLearning";
import Profile from "./pages/student/Profile";
import Dashboard from "./pages/Dashboard";
// import Task from "./components/Task";
// import Sidebar from "./pages/admin/Sidebar";
// import Dashboard from "./pages/admin/Dashboard";
// import CourseTable from "./pages/admin/course/CourseTable";
// import AddCourse from "./pages/admin/course/AddCourse";
// import EditCourse from "./pages/admin/course/EditCourse";
// import CreateLecture from "./pages/admin/lecture/CreateLecture";
// import EditLecture from "./pages/admin/lecture/EditLecture";
// import CourseDetail from "./pages/student/CourseDetail";
// import CourseProgress from "./pages/student/CourseProgress";
// import SearchPage from "./pages/student/SearchPage";
import {
  AdminRoute,
  AuthenticatedUser,
  ProtectedRoute,
} from "./components/ProtectedRoutes";
// import PurchaseCourseProtectedRoute from "./components/PurchaseCourseProtectedRoute";
// import { ThemeProvider } from "./components/ThemeProvider";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            {/* <Courses /> */}
            {/* <Task/> */}
          </>
        ),
      },
      {
        path: "login",
        element: (
          // <AuthenticatedUser>
            <Login />
          // </AuthenticatedUser>
        ),
      },
      {
        path: "my-learning",
        element: (
          // <ProtectedRoute>
            <MyLearning />
          // </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          // <ProtectedRoute>
            <Profile />
          // </ProtectedRoute>
        ),
       },
       {
        path: "profile",
        element: (
          <AuthenticatedUser>
            <Dashboard/>
          </AuthenticatedUser>
        ),
       },
      
    ],
  },
]);

function App() {
  return (
    <main>
      {/* <ThemeProvider> */}
      <RouterProvider router={appRouter} />
      {/* </ThemeProvider> */}
    </main>
  );
}

export default App;