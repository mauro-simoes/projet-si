import React, { useEffect } from 'react';
import { Product } from '../models/product/ProductModels';
import { CATEGORIES, PANIER, ROLE, TOKEN } from '../core/constants';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
} from "@/components/ui/tabs"
import { Button } from '@/components/ui/button';
import { getProductById } from '../services/product/ProductService';
import { toast } from 'sonner';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Panier() {

  // let total = 0;
  // function getTotal(){
  //   getPanier().map((produit) => {
  //     total += produit.price;
  //   })
  //   return total;
  // }

  const navigator = useNavigate();
  const [products,setProducts] = useState<Product[]>([]);
  const [token,setToken] = useState("");

  useEffect(() => {
    let localToken = localStorage.getItem(TOKEN)
    if( localToken == null){
      navigator("/accueil",{replace:true});
    }else{
      setToken(localToken);
    }
    let panier = localStorage.getItem(PANIER)
    if(panier != null){
      panier.split(",");
    }
},[]);

  function loadData(productId:number){
    getProductById(productId)
      .then(response => {
          if(response.data != null)
            products.push(response.data);
          else{
            toast.error("Il n'y a pas de produits");
        }
    }).catch(error => {
       toast.error("Les produits n'ont pas pu être récupérés : " + error.response.data.message);
      });
    }

    return (

      <Tabs defaultValue="all" style={{marginTop:'60px', width:'100%'}}>
      <TabsContent value="all">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Panier</CardTitle>
            <CardDescription>
              Gérer votre panier et procéder au paiement !
            </CardDescription>
          </CardHeader>
          <CardContent>
          <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="hidden md:table-cell">Image</span>
                        </TableHead>
                        <TableHead>Nom</TableHead>
                        <TableHead className="hidden md:table-cell">
                          <span>Prix</span>
                        </TableHead>
                        <TableCell className="hidden md:table-cell">
                          <span>Quantité</span>
                        </TableCell>
                        <TableHead className="hidden md:table-cell">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((produit) => (
                        <TableRow>
                        <TableCell className="hidden sm:table-cell">
                          {produit.img}
                        </TableCell>
                        <TableCell className="font-medium">
                          {produit.productName}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {produit.price} €
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <span>Supprimer</span>
                        </TableCell>
                      </TableRow>
                      ))}
                    </TableBody>
                  </Table>
          </CardContent>
          <span className="ml-10 mt-5">Total : {getTotal()} €</span>
        <div className='mb-10 mr-5 flex justify-end'>
          <Button>Payer</Button>
        </div>
        </Card>
      </TabsContent>
    </Tabs>
    
  );
}

export default Panier;
