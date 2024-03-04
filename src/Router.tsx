import { RouterProvider, createBrowserRouter } from "react-router-dom"
import ErrorPage from "@pages/ErrorPage"
import { Homepage } from "@pages/Homepage"
import { Novel } from "@pages/Novel"
import { SignUp } from "@pages/SignUp"
import { SignIn } from "@pages/SignIn"
import { Library } from "@pages/Library"
import { Chapter } from "./Pages/Chapter"

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
    path: "/novel/:novelId/chapter/:chapterId",
    element: <Chapter />,
  },
  {
    path: "/novel/:novelId",
    element: <Novel />,
  },
  {
    path: "/biblioteca",
    element: <Library />,
  }
])

export const Router = () => <RouterProvider router={router} />