import React from "react";
import ReactDOM from "react-dom/client";
import HomePage from "./pages/Home";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CandidatesPage from "./pages/Candidates";
import { SiteHeader } from "./components/Header";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/candidates",
    element: <CandidatesPage />,
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SiteHeader />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
