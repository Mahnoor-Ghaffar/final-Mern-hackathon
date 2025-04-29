import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import HeroSection from "./pages/student/HeroSection";
import MainLayout from "./layout/MainLayout";
// import Courses from "./pages/student/Courses";
import MyLearning from "./pages/student/MyLearning";
import Profile from "./pages/student/Profile";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext"
import PrivateRoute from "./components/PrivateRoute"
// import {
//   AdminRoute,
//   AuthenticatedUser,
//   ProtectedRoute,
// } from "./components/ProtectedRoutes";
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
        path: "Dashboard",
        element: (
          <AuthProvider>
            {/* <PrivateRoute> */}
              <Dashboard/>
            {/* </PrivateRoute> */}
          </AuthProvider>
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