import React, { useState } from "react";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import "./index.css";

import MainInterface from "./pages/MainInterface/MainInterface";
import Main from "./pages/ModeSelectionPage/Main";
import Create from "./pages/CreatePage/Create";

import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Editor from "./Components/Main/Editor/Editor";

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
  {
    path: "/main",
    element: <MainInterface />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Main /> },
      {
        path: "/main/create",
        element: <Create />,
        children: [
          {
            path: "editor",
            element: <Editor />,
          },
        ],
      },
      { path: "/main/study", element: <ErrorPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
