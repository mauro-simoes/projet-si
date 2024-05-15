import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardFooter
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAllProducts, likeProduct, unlikeProduct } from '../services/product/ProductService';
import { Product } from '../models/product/ProductModels';
import { toast } from 'sonner';
import { CATEGORIES, PANIER, ROLE, TOKEN } from '../core/constants';
import { getUserInfo } from '../services/user/UserService';
import Header from '../core/Header';

function DetailCategorie() {
  
  const { categorieId } = useParams();
  const navigate = useNavigate();

  const[category,setCategory] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [userLoggedIn,setUserLoggedIn] = useState(false);
  const [userId,setUserId] = useState(0);

  function loadData(category:string){
    getAllProducts(category)
      .then(response => {
          if(response.data != null)
            setProducts(response.data);
          else{
            toast.error("Il n'y a pas de produits");
        }
    }).catch(error => {
       toast.error("Les produits n'ont pas pu être récupérés : " + error.response.data.message);
    });
  }

  useEffect(() => {
    if(categorieId != null){
      let categoryObj = CATEGORIES.find(category => category.id === parseInt(categorieId));
      if(categoryObj != null){
        setCategory(categoryObj.title);
        loadData(categoryObj.title);
      }
    }else{
      navigate("/acceuil",{replace:true});
    }

    let localToken = localStorage.getItem(TOKEN);
    if(localToken!= null){
      getUserInfo(localToken)
      .then(response => {
        if(response.data != null){
          setUserId(response.data.id);
        }
      })
      .catch(error => {
        toast.error("Echec de la mise à jour : " + error.response.data.message);
      });
      setUserLoggedIn(true);
    }
  },[]);

  const ajouterAuPanier = (produit : Product) => {
    let panier = localStorage.getItem(PANIER)
    if(panier != null && !panier.includes(String(produit.id))){
      panier = panier + "," + produit.id;
      localStorage.setItem(PANIER, panier);
    }else{
      localStorage.setItem(PANIER, String(produit.id));
    }
  };

  const toggleLike = (product:Product) => {
    let localToken = localStorage.getItem(TOKEN);
    if(localToken != null){
      let productLiked = product.likedBy != null && product.likedBy.find(user => user.id == userId) != null;
      if(productLiked){
        unlikeProduct(product.id,localToken)
        .then(response => {
          if(response.data){
            toast.success(product.name + " unliké avec succes");
          }else{
            toast.error("Echec du unlike");
          }
          loadData(product.category);
        }).catch(error => {
          toast.error("Echec du unlike : " + error.response.data.message);
        });
      }else{
        likeProduct(product.id,localToken)
        .then(response => {
          if(response.data){
            toast.success(product.name + " liké avec succes");
          }else{
            toast.error("Echec du like");
          }
          loadData(product.category);
        }).catch(error => {
          toast.error("Echec du like : " + error.response.data.message);
        });
      }
    }
  }
    
  return (
    <>
      <Header />
        <div className="home-page mx-auto mt-20">
          <h1 className="text-3xl font-bold text-center my-10">Découvrez nos {category}</h1>
          <div className="flex flex-wrap justify-center gap-20 p-10">
            {products.map((produit) => (
              <div key={produit.name} className="w-60 p-5">
                <Card style={{ height: '400px', width: '240px' }}>
                  <CardHeader>
                    <CardTitle>{produit.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img src={produit.image} className="w-full h-auto" alt="img non trouvé" />
                  </CardContent>
                  <CardFooter className='block'>
                    <span>{produit.price}€</span>
                    <div className="flex justify-end">
                      <Button className='mt-2' onClick={() => ajouterAuPanier(produit)}>
                        Ajouter au panier
                      </Button>
                      <img alt="coeur" onClick={() => toggleLike(produit)} className='ml-2 cursor-pointer' src={userLoggedIn && produit.likedBy?.find(user => user.id == userId) != null ? "heart-red.svg" :"heart.svg" } />
                      <span className='ml-1.5 mt-2.5'>{produit.nbLike == null ? 0 : produit.nbLike}</span>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
    </>
  );
  }

export default DetailCategorie;
