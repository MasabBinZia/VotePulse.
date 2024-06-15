import ProtectedRoute from "@/components/ProtectedRoute";
import AdminAuthPage from "@/pages/AdminAuthPage";
import CandidatesPage from "@/pages/Candidates";
import HomePage from "@/pages/Home";
import Profile from "@/pages/Profile";
import UserLoginPage from "@/pages/UserLoginPage";
import UserSignUpPage from "@/pages/UserSignUpPage";
import VoteNow from "@/pages/VoteNow";
import Votes from "@/pages/Votes";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/profile",
    element: <Profile />,
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
    element: <Votes/>,
  },
]);
