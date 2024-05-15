"use client"
import Profile from "./pages/user/Profile";
import LogIn from "./pages/auth/LogIn";
import SignUp from "./pages/auth/SignUp";
import Accueil from "./pages/Accueil";
import {RouterProvider, createHashRouter } from "react-router-dom";
import Management from "./pages/management/Management";
import DetailCategorie from "./pages/DetailCategorie";
import Panier from "./pages/Panier";
import React from "react";

const router = createHashRouter([
  {
    path:"/",
    element:<Accueil/>
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
  },
  {
    path:"/categories/:categorieId",
    element: <DetailCategorie/>
  },
  {
    path:"/accueil",
    element: <Accueil/>
  },
  {
  path:"/panier",
  element: <Panier/>
}
]);

export default function Home() {
  return (
    <div className="flex items-center border-2 h-full">
      <RouterProvider router={router} />
    </div>
  );
}
