"use client"
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
  } from "@/components/ui/menubar";
import { useEffect, useState } from "react";
import { ROLE, TOKEN } from "./constants";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Header(){

  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userIsAdmin, setUserIsAdmin] = useState(false);

  const navigate = useNavigate();
  
  useEffect(() =>{
    if(localStorage.getItem(TOKEN) != null){
      setUserLoggedIn(true);
    }
    if(localStorage.getItem(ROLE) != null && localStorage.getItem(ROLE) == "ADMIN"){
      setUserIsAdmin(true);
    }
  })

  function logOut(){
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(ROLE);
    navigate("/connexion",{replace: true});
  }

  return(
    <Menubar className="bg-orange-500 text-white fixed top-0 w-full h-30 px-5 py-3">
        <div className="flex items-center justify-between w-full">
          <MenubarMenu>
            <div className="flex space-x-4">
              <Link to="/accueil">Accueil</Link>
              {userIsAdmin && <Link to="/gestion">Gestion</Link>}
            </div>
            <div>
              {
                userLoggedIn && !userIsAdmin &&
                  <>
                    <div className="ml-auto flex items-center space-x-4">
                      <Link to="/panier"><img src="shopping-bag.svg" alt="Panier" /></Link>
                      <MenubarTrigger className="px-3 py-2 cursor-pointer">
                        <img src="profile.svg" alt="Profil" />
                      </MenubarTrigger>
                    </div>
                    <MenubarContent>
                        <Link to="/profil"><MenubarItem className="px-3 py-2 cursor-pointer">Profil</MenubarItem></Link>
                        <Link to="/"><MenubarItem className="px-3 py-2 cursor-pointer" onClick={() => logOut()}>Déconnexion</MenubarItem></Link>
                    </MenubarContent>
                  </> 
              }
              {
                !userLoggedIn &&
                <>
                  <Button variant="secondary" className="mx-8" onClick={() => navigate("/inscription",{replace:true})}>Inscription</Button>
                  <Button variant="secondary" onClick={() => navigate("/connexion",{replace:true})}>Connexion</Button>
                </>
              }
              {
                userLoggedIn && userIsAdmin &&
                <>
                  <Button variant="secondary" className="mx-8" onClick={() => logOut()}>Deconnexion</Button>
                </>
              }
            </div>
          
          </MenubarMenu>
        </div>
      </Menubar>
  );
}