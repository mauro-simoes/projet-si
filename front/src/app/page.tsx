"use client"
import Profile from "./pages/user/Profile";
import LogIn from "./pages/auth/LogIn";
import SignUp from "./pages/auth/SignUp";
import Accueil from "./pages/Accueil";
import {RouterProvider, createHashRouter } from "react-router-dom";
import Management from "./pages/management/Management";
import DetailCategorie from "./core/DetailCategorie";
import Header from "./core/Header";
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
    path:"/accueil",
    element:<Accueil/>
  },
  {
    path:"/gestion",
    element:<Management/>
  },
  {
    path: "/categories/:categorieId",
    element: <DetailCategorie/>
  }
]);

export default function Home() {
  return (

    <React.Fragment>
      <Header />
        <div className="flex items-center border-2 h-full">
          <RouterProvider router={router} />
        </div>
    </React.Fragment>
    //Footer div mail au hasard mail support + numtel
    
  );
}
