import React, { useState } from "react";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import "./index.css";

import MainInterface from "./pages/MainInterface/MainInterface";
import Main from "./pages/ModeSelectionPage/Main";
import Create from "./pages/CreatePage/Create";

import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Editor from "./Components/Main/Editor/Editor";
import SuccessScreen from "./Components/UI/SuccessScreen/SuccessScreen";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SamplePage, {
  loader as sampleQuestionsLoader,
} from "./pages/SamplePage/SamplePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  { path: "/login", element: <LoginPage /> },
  {
    path: "/sample",
    element: <SamplePage />,
    id: "sample-page",
    loader: sampleQuestionsLoader,
  },
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
      { path: "study", element: <ErrorPage /> },
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
      {
        path: "write",
        element: <p>asd</p>,
      },
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
