import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Homepage } from "./Pages/Homepage"
import ErrorPage from "./Pages/ErrorPage"
import { Novel } from "./Pages/Novel"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/novel",
    element: <Novel />
  }
])

export const Router = () => <RouterProvider router={router}/>