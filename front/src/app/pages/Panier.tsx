import React from 'react';
import { getPanier } from '../services/PanierService';
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

function Panier() {

  let total = 0;
  function getTotal(){
    getPanier().map((produit) => {
      total += produit.price;
    })
    return total;
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
                          Prix
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Actions
                        </TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getPanier().map((produit) => (
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
