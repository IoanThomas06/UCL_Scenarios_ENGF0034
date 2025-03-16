import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Listings from "./Listings";
import Search from "./Search";
import Login from "./Login";
import Borrowing from "./Borrowing";


const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/listings",
      element: <Listings />,
    },
    {
      path: "/search",
      element: <Search />,
    },
    {
      path: "/borrowing",
      element: <Borrowing />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    

  ],
  { basename: import.meta.env.BASE_URL }
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);