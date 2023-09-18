import React, { useState } from "react";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import "./index.css";

import MainInterface from "./pages/MainInterface/MainInterface";
import Main from "./pages/ModeSelectionPage/Main";
import Create from "./pages/CreatePage/Create";

import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Editor from "./Components/Main/Editor/Editor";
import SuccessScreen from "./Components/UI/SuccessScreen/SuccessScreen";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <p>wip!</p>
      </div>
    ),
    errorElement: <ErrorPage />,
  },
  { path: "/login", element: <p>login is still a wip...</p> },
  {
    path: "/dashboard",
    element: <p>dashboard</p>,
  },
  {
    path: "/main",
    element: <MainInterface />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Main /> },
      {
        path: "create",
        element: <Create />,
        children: [
          {
            path: "editor",
            element: <Editor />,
          },
          {
            path: "success",
            element: <SuccessScreen />,
          },
        ],
      },
      { path: "study", element: <ErrorPage /> },
      {
        path: "test",
        element: <p>wip...</p>,
        children: [{ path: ":testId", element: <p></p> }],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
