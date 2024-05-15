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
import { Button } from '@/components/ui/button';
import { getPanier } from '../services/PanierService';
import { useState } from 'react';
import { useEffect } from 'react';

function DetailCategorie() {
  
  const { categorieId } = useParams();
  
  const [panier, setPanier] = useState<Product[]>([]); 
  const [produits, setProduits] = useState<Product[]>([]); 
  
  useEffect(() => {
    setPanier(getPanier());
  }, []);

  useEffect(() => {
    if(categorieId) {
      const produitsInitiales = getProduits().filter(produit => produit.categorieId === parseInt(categorieId)).map(produit => ({
        ...produit,
        isLiked: false,
        productLike: produit.productLike || 0 
      }));
      setProduits(produitsInitiales);
    }
  }, [categorieId]);

  const ajouterAuPanier = (produit : Product) => {
    setPanier([...panier, produit]);
  };

  const toggleLike = (productId : number) => {
    const newProducts = products.map(product => {
      if (product.productId === productId) {
        return {
          ...product,
          productLike: product.isLiked ? product.productLike - 1 : product.productLike + 1,
          isLiked: !product.isLiked
        };
      }
      return product;
    });
    setProduits(newProducts);
    console.log(newProducts);
  };
    
  const products = categorieId ? getProduits().filter(product => product.categorieId === parseInt(categorieId)) : [];
  const categorie = categorieId ? getCategories().find(category => category.id === parseInt(categorieId)) : null;

  return (
    <div className="home-page h-full mt-20">
      <h1 className="text-3xl font-bold text-center my-10">Découvrez nos {categorie?.title}</h1>
      <div className="flex flex-wrap justify-center gap-20 p-10">
        {products.map((produit) => (
          <div key={produit.productName} className="w-60 p-5">
            <Card style={{height:'400px', width:'240px'}}>
              <CardHeader>
                <CardTitle>{produit.productName}</CardTitle>
              </CardHeader>
              <CardContent>
                  <img src={produit.img} className="w-full h-auto" alt="img non trouvé"/>
              </CardContent>
              <CardFooter className='block'>
                <span>{produit.price}€</span>
                <div className="flex justify-end">
                  <Button className='mt-2' onClick={() => ajouterAuPanier(produit)}>  
                    Ajouter au panier
                  </Button>
                  <img alt="coeur" onClick={() => toggleLike(produit.productId)} className='ml-2' src={produit.isLiked? "heart-red.svg" : "heart.svg"} />
                  <span className='ml-1.5 mt-2.5'>{produit.productLike}</span>
                </div>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
  }

export default DetailCategorie;
