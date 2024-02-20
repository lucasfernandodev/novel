import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Homepage } from "./Pages/Homepage"
import ErrorPage from "./Pages/ErrorPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    errorElement: <ErrorPage />,
  }
])

export const Router = () => <RouterProvider router={router}/>