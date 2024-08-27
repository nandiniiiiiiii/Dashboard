import React from 'react'
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import DashBoard from './pages/DashBoard';
import Stats from './pages/Stats';
import Graphs from './pages/Graphs'
import DatePage from './pages/DatePage';
import Other from './pages/Other';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <DashBoard/>
    },
    {
      path: "/stats",
      element: <Stats/>
    },
    {
      path: "/graphs",
      element: <Graphs/>
    },
    {
      path: "/dates",
      element: <DatePage/>
    },
    {
      path: "/other",
      element: <Other/>
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
