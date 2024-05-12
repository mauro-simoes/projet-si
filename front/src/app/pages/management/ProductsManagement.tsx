"use client"
import React, { useEffect, useState } from 'react'
import { MoreHorizontal } from "lucide-react"

import { Rating } from '@smastrom/react-rating'
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { approveUserAccount, changeUserPasswordAsAdmin, getAllUsers, suspendUserAccount } from '../../services/user/UserService'
import { AdminPasswordChangeRequest, User } from '../../models/user/UserModels'
import { Button } from '@/components/ui/button'
import { ACCOUNT_STATUSES, RADIE } from '../../core/constants'
import { toast } from 'sonner'
import { Input} from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Product } from '@/app/models/product/ProductModels'
import { getAllProducts } from '@/app/services/product/ProductService'
import { Textarea } from '@/components/ui/textarea'


export default function ProductManagement() {
  const [stock, setStock] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [price, setPrice] = useState(0);
  const [comment, setComment] = useState("");
  const [description, setDescription] = useState("");

  const [token,setToken] = useState("");
  const [products,setProducts] = useState([{} as Product]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const extractProductUpdateInterface = (product: Product) => {
    return {
        id_product: product.id_product,
        product_name: product.product_name,
        category: product.category,
        discount: discount,
        price: price,
        stock: stock,
        description: description,
        product_note: product.product_note,
        comment: comment
    } as Product
}

  function updateProduct(product:Product){

  }

  function loadData(){
    getAllProducts(token)
      .then(data => {
          setProducts(data);
      })
  }

  useEffect(() => {
      let tokenLocalStorage = localStorage.getItem("token");
      if(tokenLocalStorage == null){
          setToken("token");
      }
      loadData();
  },[]);

  return (
        <Card className='overflow-y-auto max-h-[600px]'>
          <CardHeader className="px-7">
            <CardDescription className="text-center">Gerez les produits ici</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produit</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Promotion en %</TableHead>
                  <TableHead>Note</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id_product}>
                      <TableCell>
                        {product.product_name}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {product.category}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {product.stock}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {product.price}€
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {product.discount}
                      </TableCell>
                      <TableCell className="text-center">
                        <Rating
                          style={{ maxWidth: 100 }}
                          value={product.product_note}
                          readOnly />
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem className='cursor-pointer' onClick={() => setIsEditDialogOpen(true)}>Modifier</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>

                        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                          <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                              <DialogTitle>Mise à jour produit</DialogTitle>
                              <DialogDescription>
                                Produit : {product.product_name}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4">
                              <div className="grid grid-cols-3 gap-6">
                                  <div className="grid gap-2">
                                      <Label htmlFor="new">Stock</Label>
                                      <Input type='number' defaultValue={product?.stock} min="0" onChange={e => setStock(Number(e.target.value))} />
                                  </div>
                                  <div className="grid gap-2">
                                      <Label htmlFor="new">Remise en %</Label>
                                      <Input defaultValue={product?.discount} min="0" max="100" onChange={e => setDiscount(Number(e.target.value))} />
                                  </div>
                                  <div className="grid gap-2">
                                      <Label htmlFor="new">Prix</Label>
                                      <Input defaultValue={product?.price} min="0" onChange={e => setPrice(Number(e.target.value))} />
                                  </div>
                              </div>
                              <div className="grid gap-2">
                                  <Label htmlFor="new">Comment</Label>
                                  <Input defaultValue={product?.comment} onChange={e => setComment(e.target.value)} />
                              </div>
                              <div className="grid gap-2">
                                  <Label htmlFor="new">Description</Label>
                                  <Textarea defaultValue={product?.description} onChange={e => setDescription(e.target.value)} />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button onClick={() => updateProduct(extractProductUpdateInterface(product))}>Sauvegarder</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                      </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
  )
}