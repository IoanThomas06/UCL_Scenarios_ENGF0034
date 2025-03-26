import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Search from "./Search";
import Borrowing from "./Borrowing";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import LoginRedirect from "./LoginRedirect.tsx";
import Callback from "./Callback.tsx";
import Logout from "./Logout.tsx";


const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/search",
      element: <Search />,
    },
    {
      path: "/borrowing",
      element: (
        <ProtectedRoute>
          <Borrowing />
        </ProtectedRoute>
      ),
    },
    {
      path: "/login",
      element: <LoginRedirect />,
    },
    {
      path: "/callback",
      element: <Callback />,
    },
    {
      path: "/logout",
      element: <Logout />,
    },
    

  ],
  { basename: import.meta.env.BASE_URL }
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);