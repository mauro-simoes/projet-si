"use client"
import Profile from "./pages/Profile";
import LogIn from "./pages/auth/LogIn";
import SignUp from "./pages/auth/SignUp";
import {RouterProvider, createHashRouter } from "react-router-dom";

const router = createHashRouter([
  {
    path:"/",
    element:<Profile/>
  },
  {
    path:"/inscription",
    element:<SignUp/>
  },
  {
    path:"/connexion",
    element:<LogIn/>
  },
  {
    path:"/profil",
    element:<Profile/>
  }
]);

export default function Home() {
  return (
    <div className="flex items-center border-2 h-screen">
      <RouterProvider router={router} />
    </div>
    
  );
}
