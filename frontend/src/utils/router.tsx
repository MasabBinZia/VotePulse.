import ProtectedRoute from "@/components/ProtectedRoute";
import AdminAuthPage from "@/pages/AdminAuthPage";
import CandidatesPage from "@/pages/Candidates";
import HomePage from "@/pages/Home";
import UserAuthPage from "@/pages/UserAuthPage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/candidates",
    element: (
      <ProtectedRoute>
        <CandidatesPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user-auth",
    element: <UserAuthPage />,
  },
  {
    path: "/admin-auth",
    element: <AdminAuthPage />,
  },
]);
