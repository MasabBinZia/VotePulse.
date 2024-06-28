import {
  HomePage,
  AdminAuthPage,
  CandidatesPage,
  ProfilePage,
  UserLoginPage,
  UserSignUpPage,
  VoteNow,
  Votes,
} from "../pages/index";
import ProtectedRoute from "@/components/ProtectedRoute";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/candidates",
    element: <CandidatesPage />,
  },
  {
    path: "/vote",
    element: (
      <ProtectedRoute>
        <VoteNow />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user-login",
    element: <UserLoginPage />,
  },
  {
    path: "/user-signup",
    element: <UserSignUpPage />,
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
    element: <Votes />,
  },
]);
