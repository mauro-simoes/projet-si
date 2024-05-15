import React from 'react';
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardFooter
} from "@/components/ui/card"
import { getProduits } from '../services/ProduitService';

export default function Produits() {

  return (
    <div className="home-page h-full">
      <h1 className="text-3xl font-bold text-center my-10">Découvrez nos produits</h1>
      <div className="flex flex-wrap justify-center gap-15 p-10">
        {getProduits().map((produit) => (
          <div key={produit.productName} className="w-60 p-3">
            <Card className="h-90 w-110">
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
};
