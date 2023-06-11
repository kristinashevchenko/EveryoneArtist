import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StartPage } from "../pages/start";
import { QuizPage, loader as userLoader } from "../pages/quiz";
import { Layout } from "../pages/layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <StartPage />,
      },
      {
        path: "users/:userId",
        element: <QuizPage />,
        loader: userLoader,
      },
    ],
  },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
