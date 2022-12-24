import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"
import MainLayout from "./layouts/MainLayout"
import DepartmentsPage from "./pages/DepartmentsPage"
import EmployeesPage from "./pages/EmployeesPage"
import ErrorPage from "./pages/ErrorPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />, // 404 page
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
        path: "departments",
        element: <DepartmentsPage />,
      },
      // {
      //   path: "startups",
      //   element: <StartupsPage />,
      // },
      // {
      //   path: "apply-process",
      //   element: <ApplyPage />,
      // },
      // {
      //   path: "services",
      //   element: <ServicesPage />,
      // },
      // {
      //   path: "faq",
      //   element: <FaqPage />,
      // },
      // {
      //   path: "contact-us",
      //   element: <ContactPage />,
      // },
    ],
  },
  // {
  //   path: "/auth",
  //   element: <AuthLayout />,
  //   errorElement: <ErrorPage />,
  //   children: [
  //     {
  //       path: "login",
  //       element: <LoginPage />,
  //     },
  //     {
  //       path: "signup",
  //       element: <SignupPage />,
  //     },
  //   ],
  // },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
