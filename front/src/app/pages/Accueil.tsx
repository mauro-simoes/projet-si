import React from 'react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"

import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardFooter
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";

const categories = [
  { title: "Caméra", img: '/camera.jpg'},
  { title: "Appareil Photo", img: '/appareil-photo.jpg'},
  { title: "Microphone", img: '/microphone.jpg'},
  { title: "Pied d'éclairage", img: '/pied-eclairage.png'},
  { title: "Carte mémoire", img: '/carte-memoire.jpg'},
  { title: "Moniteurs", img: '/moniteur.jpg'},
  { title: "Streamers", img: '/streamer.jpg'}
];

export default function Accueil() {
  return (
    <React.Fragment>
    <Menubar className="bg-orange-800 text-white fixed top-0 w-full px-5 py-3">
      <div className="flex justify-between items-center w-full">
        <MenubarMenu>
          <div className="flex space-x-4">
            <a href="/"><MenubarTrigger className="hover:bg-gray-700 px-3 py-2 rounded">Accueil</MenubarTrigger></a>
          </div>
          <a href="/"><MenubarTrigger className="px-3 py-2"><img src="/panier.png" alt="icône non trouvée"/></MenubarTrigger></a>
          <a href="/"><MenubarTrigger className="px-3 py-2"><img src  ="/user.png" alt="icône non trouvée"/></MenubarTrigger></a>
          <MenubarContent>
            <a href="/"><MenubarItem className="px-3 py-2">Profil</MenubarItem></a>
            <a href="/"><MenubarItem className="px-3 py-2">Déconnexion</MenubarItem></a>
          </MenubarContent>
        </MenubarMenu>
      </div>
    </Menubar>


    <div className="home-page h-full">
      <h1 className="text-3xl font-bold underline text-center my-10">Découvrez nos catégories</h1>
      <div className="flex flex-wrap justify-center gap-15 p-10">
        {categories.map((category) => (
          <div key={category.title} className="w-60 p-5">
            <Card className="h-30">
              <CardHeader>
                <CardTitle>{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                  <img src={category.img} className="w-full h-auto" alt="img non trouvé"/>
              </CardContent>
              <CardFooter>
                <Button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
                  Découvrir.. 
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
    </React.Fragment>
  );
};
