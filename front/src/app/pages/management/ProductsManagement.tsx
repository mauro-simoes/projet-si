"use client"
import React, { useEffect, useState } from 'react'
import { MoreHorizontal } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Rating } from '@smastrom/react-rating'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
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
import { Button } from '@/components/ui/button';
import { Input} from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Product } from '@/app/models/product/ProductModels'
import { addProduct, deleteProduct, getAllProducts, updateProduct } from '@/app/services/product/ProductService'
import { Textarea } from '@/components/ui/textarea'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowUpDown} from "lucide-react"
import { CATEGORIES, ROLE, TOKEN } from '@/app/core/constants'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'


export default function ProductManagement() {

  const navigator = useNavigate();

  const [stock, setStock] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [price, setPrice] = useState(0);
  const [comment, setComment] = useState("");
  const [description, setDescription] = useState("");
  const [name, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const [searchCategory, setSearchCategory] = useState("");

  const [token,setToken] = useState("");
  const [products,setProducts] = useState<Product[]>([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  const extractProductCreateInterface = () => {
    return {
        name: name,
        category: category,
        discount: discount,
        price: price,
        stock: stock,
        description: description,
        comment: comment,
        image: image
    } as Product
  }   

  const extractProductUpdateInterface = (product: Product) => {
    return {
        id: product.id,
        name: product.name,
        category: product.category,
        discount: discount == null ? product.discount : discount,
        price: price == null ? product.price : price,
        stock: stock == null ? product.stock : stock,
        description: description == null ? product.description : description,
        comment: comment,
        image:product.image,
        addedDate:product.addedDate,
        managedBy: product.managedBy
    } as Product
  }   

  function extract64Base(e :any){
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
        if(reader.result != null){
            if(reader.result.toString() !== ''){
                setImage(reader.result.toString());
            } 
        }
    }
  }

  function createProduct(product: Product): void {
    addProduct(product, token)
      .then(response => {
          if(response.data){
              toast.success(product.name + " ajouté avec succes");
          }else{
              toast.error("Echec de l'ajout");
          }
          setIsCreateDialogOpen(false);
          loadData(product.category);
      }).catch(error => {
         toast.error("Echec de l'ajout : " + error.response.data.message);
      });
  }

  function update(product:Product){
    updateProduct(product, token)
    .then(response => {
        if(response.data){
            toast.success(product.name + " mis à jour avec succes");
        }else{
            toast.error("Echec de la mise à jour");
        }
    }).catch(error => {
       toast.error("Echec de la mise à jour : " + error.response.data.message);
    });
  }

  function deleteProd(productId: number){
    deleteProduct(productId, token)
    .then(response => {
        if(response.data){
            toast.success("Produit supprimé avec succes");
        }else{
            toast.error("Echec de la suppression");
        }
    }).catch(error => {
       toast.error("Echec de la suppression : " + error.response.data.message);
    });
  }

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
      let localToken = localStorage.getItem(TOKEN)
      if( localToken == null){
        navigator("/accueil",{replace:true});
      }else{
        setToken(localToken);
      }
      let role = localStorage.getItem(ROLE);
      if(role == null || role != "ADMIN"){
        navigator("/accueil",{replace:true});
      }
  },[]);

  const columns: ColumnDef<Product,any>[] = [
    {
      accessorKey: "image",
      accessorFn:(row) => row.image,
      header: () => <div></div>,
      cell: ({ row }) => {
        return <Avatar>
                  <AvatarImage className="w-[80px] h-[80px] rounded" src={row.getValue("image")} />
              </Avatar>
      },
    },
    {
      accessorKey: "name",
      accessorFn:(row) => row.name,
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Produit
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "stock",
      accessorFn:(row) => row.stock,
      header: () => <div >Stock</div>,
      cell: ({ row }) => {
        return <div className="font-medium">{row.getValue("stock")}</div>
      },
    },
    {
      accessorKey: "discount",
      accessorFn:(row) => row.discount,
      header: () => <div>Promotion en %</div>,
      cell: ({ row }) => {
        return <div className="font-medium">{row.getValue("discount")}</div>
      },
    },
    {
      accessorKey: "price",
      accessorFn:(row) => row.price,
      header: () => <div>Prix</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("price"))
        const formatted = new Intl.NumberFormat("fr", {
          style: "currency",
          currency: "EUR",
        }).format(amount)
  
        return <div className="font-medium">{formatted}</div>
      },
    },
    {
      accessorKey: "addedDate",
      accessorFn:(row) => row.addedDate,
      header: () => <div >Date d'ajout</div>,
      cell: ({ row }) => {
        return <div className="font-medium">{ new Date((row.getValue("addedDate") as string)).toISOString().split('T')[0]}</div>
      },
    },
    {
      accessorKey: "managedBy",
      accessorFn:(row) => row.managedBy.mail,
      header: () => <div >Gestionnaire</div>,
      cell: ({ row }) => {
        return <div className="font-medium">{row.getValue("managedBy")}</div>
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const product = row.original
  
        return (
          <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-haspopup="true" size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem className='cursor-pointer' onClick={() => setIsAlertDialogOpen(true)}>Supprimer</DropdownMenuItem>
              <DropdownMenuItem className='cursor-pointer' onClick={() => setIsEditDialogOpen(true)}>Modifier</DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
            

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Mise à jour produit</DialogTitle>
                  <DialogDescription>
                    Produit : {product.name}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="grid gap-2">
                      <Label>Stock</Label>
                      <Input type='number' defaultValue={product?.stock} min="0" onChange={e => setStock(Number(e.target.value))} />
                    </div>
                    <div className="grid gap-2">
                      <Label>Remise en %</Label>
                      <Input defaultValue={product?.discount} min="0" max="100" onChange={e => setDiscount(Number(e.target.value))} />
                    </div>
                    <div className="grid gap-2">
                      <Label>Prix</Label>
                      <Input defaultValue={product?.price} min="0" onChange={e => setPrice(Number(e.target.value))} />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Comment</Label>
                    <Input value={product?.comment} disabled={true} />
                  </div>
                  <div className="grid gap-2">
                    <Label>Description</Label>
                    <Textarea defaultValue={product?.description} onChange={e => setDescription(e.target.value)} />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={() => update(extractProductUpdateInterface(product))}>Sauvegarder</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>


            <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Êtes vous sur de vouloir supprimer le produit : {product.name}?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Cette action ne peut pas être annulée.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction onClick={() => deleteProd(product.id)}>Confirmer</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )
      },
    },
  ]
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({});


  const table = useReactTable<Product>({
    data: products,
    columns: columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4 justify-between">
        <Input
          placeholder="Filtrez les produits..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <div className="w-[250px]">
          <Select onValueChange={(e) => loadData(e)}>
            <SelectTrigger>
              <SelectValue placeholder="Categorie..." />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((category) => (
                <SelectItem className="cursor-pointer" value={category.title}>{category.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={() => setIsCreateDialogOpen(true)}>Ajouter produit</Button>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Création produit</DialogTitle>
              <DialogDescription>
                Entrez les informations du produit ici.
              </DialogDescription>
            </DialogHeader>

            <div className="grid max-w-sm items-center gap-1.5 my-5">
                <Input id="picture" type="file" accept=".png,.jpg,.jpeg" onChange={e => extract64Base(e)}/>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>Nom</Label>
                <Input onChange={e => setProductName(e.target.value)} />
              </div>
              <Select onValueChange={(e) => setCategory(e)}>
                <SelectTrigger>
                  <SelectValue placeholder="Categorie..." />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem className="cursor-pointer" value={category.title}>{category.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="grid grid-cols-3 gap-6">
                <div className="grid gap-2">
                  <Label>Stock</Label>
                  <Input type='number' min="0" onChange={e => setStock(Number(e.target.value))} />
                </div>
                <div className="grid gap-2">
                  <Label>Remise en %</Label>
                  <Input min="0" max="100" onChange={e => setDiscount(Number(e.target.value))} />
                </div>
                <div className="grid gap-2">
                  <Label>Prix</Label>
                  <Input min="0" onChange={e => setPrice(Number(e.target.value))} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Comment</Label>
                <Input onChange={e => setComment(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label>Description</Label>
                <Textarea onChange={e => setDescription(e.target.value)} />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => createProduct(extractProductCreateInterface())}>Créer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Pas de resultats.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}