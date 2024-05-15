import React from 'react';
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
} from "@/components/ui/card"
import { getCategories } from '../services/CategorieService';
import { Link } from 'react-router-dom';


export default function Accueil() {

  const categories = getCategories();

  return (
    <div className="home-page h-full mt-20">
      <h1 className="text-3xl font-bold underline text-center my-5">Découvrez nos catégories</h1>
      <div className="flex flex-wrap justify-center gap-15 p-10">
        {categories.map((category) => (
          <Link key={category.id} to ={`/categories/${category.id}`}>
            <div key={category.title} className="w-60 p-5">
            <Card style={{ height: '300px' }}> 
                <CardHeader>
                  <CardTitle>{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <img src={category.img} className="w-full" alt="img non trouvé"/>
                </CardContent>
              </Card>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
