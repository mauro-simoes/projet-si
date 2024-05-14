import React from 'react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { getCategories } from '../services/CategorieService';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardFooter
} from "@/components/ui/card"
import Categories from '../core/Categorie';
import Header from '../core/Header';


export default function Accueil() {

  return (
    <React.Fragment>
    <Header />
    <Categories />
    </React.Fragment>
  );
};
