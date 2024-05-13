import React from 'react';
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardFooter
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { getCategories } from '../services/CategorieService';

export default function Accueil() {

  const categories = getCategories();

  return (
    <div className="home-page h-full">
      <h1 className="text-3xl font-bold underline text-center my-5">Découvrez nos catégories</h1>
      <div className="flex flex-wrap justify-center gap-15 p-10">
        {categories.map((category) => (
          <div key={category.title} className="w-60 p-5">
            <Card className="h-50">
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
  );
};
