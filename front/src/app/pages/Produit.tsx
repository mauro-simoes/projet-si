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
import { getAllProducts, getProductById, likeProduct, unlikeProduct } from '../services/product/ProductService';
import { Product } from '../models/product/ProductModels';
import { toast } from 'sonner';
import { CATEGORIES, PANIER, ROLE, TOKEN } from '../core/constants';
import { getUserInfo } from '../services/user/UserService';
import Header from '../core/Header';
import { Purchase } from '../models/product/Order';
import Footer from '../core/Footer';

function Produit() {
  
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product>({} as Product);
  const [userLoggedIn,setUserLoggedIn] = useState(false);
  const [userId,setUserId] = useState(0);

  function loadData(id:number){
    getProductById(id)
      .then(response => {
          if(response.data != null)
            setProduct(response.data);
          else{
            toast.error("Le produit n'a pas été trouvé");
        }
    }).catch(error => {
       toast.error("Le product n'a pas été trouvé : " + error.response.data.message);
    });
  }

  useEffect(() => {
    if(productId != null){
        loadData(parseInt(productId));
    }else{
      navigate("/accueil",{replace:true});
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

  const ajouterAuPanier = (product : Product) => {
    let panier = localStorage.getItem(PANIER)
    if(panier != null){
      let parsedPanier = JSON.parse(panier);
      parsedPanier[product.id] = 1;
      localStorage.setItem(PANIER, JSON.stringify(parsedPanier));
    }else{
      let parsedPanier = "{\"" + product.id + "\":1}"; 
      localStorage.setItem(PANIER, JSON.stringify(JSON.parse(parsedPanier)));
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
          loadData(product.id);
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
          loadData(product.id);
        }).catch(error => {
          toast.error("Echec du like : " + error.response.data.message);
        });
      }
    }
  }
    
  return (
    <>
      <Header onLoginPage={false}/>
        <div className="home-page mx-auto mt-20">
            <Card className='	max-w-[800px]'>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent className='flex-row flex'>
                <div className='w-[45%]'>
                  <img src={product.image} className="w-full aspect-square" alt="img non trouvé" />
                </div>
                <div className='w-[50%] flex justify-evenly flex-col'>
                  <span>{product.description}</span>
                  <div  className="flex justify-between items-end">
                    {product.discount > 0 && <span className='font-bold text-red-600'> -{product.discount}% </span>}
                    <span className='font-bold'>{product.discount > 0 ? (product.price - (product.price * product.discount / 100)).toFixed(2) : product.price.toFixed(2) }€</span>
                    <div className="flex justify-end items-end">
                      <Button className='mt-2' onClick={() => ajouterAuPanier(product)}>
                        Ajouter au panier
                      </Button>
                      <img alt="coeur" onClick={() => toggleLike(product)} className='ml-2 cursor-pointer' src={userLoggedIn && product.likedBy?.find(user => user.id == userId) != null ? "heart-red.svg" :"heart.svg" } />
                      <span className='ml-1.5 mt-2.5'>{product.nbLike == null ? 0 : product.nbLike}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              
            </Card>
        </div>

        <Footer/>
    </>
  );
  }

export default Produit;