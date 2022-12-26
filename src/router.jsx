import { createBrowserRouter } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import DepartmentsPage from "./pages/DepartmentsPage"
import EmployeesPage from "./pages/EmployeesPage"
import ProfilePage from "./pages/ProfilePage"
import ErrorPage from "./pages/ErrorPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import AddEmployee from './pages/AddEmployee'
import DepartmentDetails from "./pages/DepartmentDetails"

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    // errorElement: <ErrorPage />, // 404 page
    children: [
      // {
      //   index: true, // Loads at '/'
      //   element: <HomePage />,
      // },
      {
        path: "employees",
        element: <EmployeesPage />,
      },
      {
        path: "employee/department/:id",
        element: <DepartmentDetails />,
      },
      {
        path: "departments",
        element: <DepartmentsPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: 'employees/add',
        element: <AddEmployee />
      }
    ],
  },
  {
    path: "/auth",
    // element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
    ],
  },
])

export default router
