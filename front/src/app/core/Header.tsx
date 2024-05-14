import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
  } from "@/components/ui/menubar";

export default function Header(){

  return(
    <Menubar className="bg-orange-800 text-white fixed top-0 w-full h-30 px-5 py-3">
        <div className="flex items-center justify-between w-full">
          <MenubarMenu>
            <div className="flex space-x-4">
              <a href="/">Accueil</a>
            </div>
            <div className="ml-auto flex items-center space-x-4">
              <a href="/"><img src="shopping-bag.svg" alt="Panier"/></a>
              <MenubarTrigger className="px-3 py-2">
                <img src="profile.svg" alt="Profil"/>
              </MenubarTrigger>
            </div>
            <MenubarContent>
              <a href="/profil"><MenubarItem className="px-3 py-2">Profil</MenubarItem></a>
              <a href="/"><MenubarItem className="px-3 py-2">Déconnexion</MenubarItem></a>
            </MenubarContent>
          </MenubarMenu>
        </div>
      </Menubar>
  );
}