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
import { Purchase } from '../models/product/Order';
import { Input } from '@/components/ui/input';

function Panier() {

  // let total = 0;
  // function getTotal(){
  //   getPanier().map((produit) => {
  //     total += produit.price;
  //   })
  //   return total;
  // }

  const navigator = useNavigate();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [token,setToken] = useState("");
  const [total,setTotal] = useState(0);

  function supprimerProduit(productId:string){

  }

  useEffect(() => {
    let localToken = localStorage.getItem(TOKEN)
    if( localToken == null){
      navigator("/accueil",{replace:true});
    }else{
      setToken(localToken);
    }
    let panier = localStorage.getItem(PANIER)
    console.log("panier " + panier);
    if(panier != null){
      let productIds:string[] = panier.split(",");
      console.log("productIds " + productIds);
      productIds.forEach(element => {
        loadData(element);
      });
    }
  },[]);

  function calculatePrice(purchase:Purchase){
    let purchasePrice = 0;
    if(purchase.product.discount == null || purchase.product.discount == 0){
      purchasePrice = purchase.quantite * purchase.product.price;
    }else{
      purchasePrice = purchase.quantite * (purchase.product.price - (purchase.product.price * purchase.product.discount / 100));
    }
    return purchasePrice
  }

  function loadData(productId:string){
    getProductById(parseInt(productId))
      .then(response => {
          if(response.data != null){
            let purchase = {product: response.data, quantite: 1} as Purchase;
            purchase.purchasePrice = calculatePrice(purchase);
            let purchaseList = purchases;
            if(!purchaseList.includes(purchase)){
              purchaseList.push(purchase);
              setPurchases(purchaseList);
            }          
          }else{
            toast.error("Le produit " + productId + " n'a a pas  été trouvé");
        }
    }).catch(error => {
       toast.error("Le produit " + productId + " n'a a pas  été trouvé : " + error.response.data.message);
      });
    }

  function setQuantity(purchase:Purchase, quantity: string): void {
    purchase.quantite = parseInt(quantity);
    setTotal(total + calculatePrice(purchase));
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
              {purchases.map((purchase) => (
                <TableRow>
                <TableCell className="hidden sm:table-cell">
                  {purchase.product.image}
                </TableCell>
                <TableCell className="font-medium">
                  {purchase.product.name}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {purchase.product.price} €
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Input type="number" onChange={e => setQuantity(purchase,e.target.value)} />
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <span>Supprimer</span>
                </TableCell>
              </TableRow>
              ))}
            </TableBody>
          </Table>
          </CardContent>
          <span className="ml-10 mt-5">Total : {total} €</span>
        <div className='mb-10 mr-5 flex justify-end'>
          <Button>Payer</Button>
        </div>
        </Card>
      </TabsContent>
    </Tabs>
    
  );
}

export default Panier;
