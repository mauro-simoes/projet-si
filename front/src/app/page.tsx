"use client"
import Profile from "./pages/user/Profile";
import LogIn from "./pages/auth/LogIn";
import SignUp from "./pages/auth/SignUp";
import {RouterProvider, createHashRouter } from "react-router-dom";
import Management from "./pages/Management";

const router = createHashRouter([
  {
    path:"/",
    element:<Management/>
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
  },
  {
    path:"/gestion",
    element:<Management/>
  }
]);

export default function Home() {
  return (
    <div className="flex items-center border-2 h-screen">
      <RouterProvider router={router} />
    </div>
    
  );
}
