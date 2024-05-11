// import ProtectedRoute from "@/components/ProtectedRoute";
import AdminAuthPage from "@/pages/AdminAuthPage";
import CandidatesPage from "@/pages/Candidates";
import HomePage from "@/pages/Home";
import UserLoginPage from "@/pages/UserLoginPage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/candidates",
    element: (
      // <ProtectedRoute>
      <CandidatesPage />
      // </ProtectedRoute>
    ),
  },
  {
    path: "/user-login",
    element: <UserLoginPage />,
  },
  {
    path: "/user-signup",
    element: <UserLoginPage />,
  },
  {
    path: "/admin-auth",
    element: <AdminAuthPage />,
  },
  {
    path: "/party",
    element: <>party</>,
  },
  {
    path: "/votes",
    element: <>votes</>,
  },
]);
