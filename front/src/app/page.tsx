"use client"
import LogIn from "./pages/auth/LogIn";
import SignUp from "./pages/auth/SignUp";
import {RouterProvider,createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path:"/",
    element:<SignUp/>
  },
  {
    path:"/inscription",
    element:<SignUp/>
  },
  {
    path:"/connexion",
    element:<LogIn/>
  }
]);

export default function Home() {
  return (
    <div className="flex items-center border-2 h-screen">
      <RouterProvider router={router} />
    </div>
    
  );
}
