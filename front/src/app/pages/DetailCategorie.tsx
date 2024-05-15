import React from 'react';
import { useParams } from 'react-router-dom';
import { getProduits } from '../services/ProduitService';
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardFooter
} from "@/components/ui/card"
import { getCategories } from '../services/CategorieService';

function DetailCategorie() {
  
  const { categorieId } = useParams();

  const products = categorieId ? getProduits().filter(product => product.categorieId === parseInt(categorieId)) : [];
  const categorie = categorieId ? getCategories().find(category => category.id === parseInt(categorieId)) : null;

  return (
    <div className="home-page h-full mt-20">
      <h1 className="text-3xl font-bold text-center my-10">Découvrez nos {categorie?.title}</h1>
      <div className="flex flex-wrap justify-center gap-15 p-10">
        {products.map((produit) => (
          <div key={produit.productName} className="w-60 p-3">
            <Card style={{height:'375px'}}>
              <CardHeader>
                <CardTitle>{produit.productName}</CardTitle>
              </CardHeader>
              <CardContent>
                  <img src={produit.img} className="w-full h-auto" alt="img non trouvé"/>
              </CardContent>
              <CardFooter>
                {produit.price}€
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DetailCategorie;
