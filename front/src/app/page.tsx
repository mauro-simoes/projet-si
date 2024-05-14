"use client"
import Profile from "./pages/user/Profile";
import LogIn from "./pages/auth/LogIn";
import SignUp from "./pages/auth/SignUp";
import Accueil from "./pages/Accueil";
import Categorie from "./core/Categorie";
import Produits from "./pages/Produit";
import {RouterProvider, createHashRouter } from "react-router-dom";
import Management from "./pages/management/Management";

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
  }
]);

export default function Home() {
  return (
    // Header
    <div className="flex items-center border-2 h-screen">
      <RouterProvider router={router} />
    </div>
    //Footer div mail au hasard mail support + numtel
    
  );
}
