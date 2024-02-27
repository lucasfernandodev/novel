import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Homepage } from "./Pages/Homepage"
import ErrorPage from "./Pages/ErrorPage"
import { Novel } from "./Pages/Novel"
import { SignUp } from "./Pages/SignUp"
import { SignIn } from "./Pages/SignIn"
import { Library } from "./Pages/Library"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/cadastrar',
    element: <SignUp />
  },
  {
    path: '/login',
    element: <SignIn />
  },
  {
    path: "/novel",
    element: <Novel />,
  },
  {
    path: "/biblioteca",
    element: <Library />,
  }
])

export const Router = () => <RouterProvider router={router} />