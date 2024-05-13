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
import { getAllProducts } from '@/app/services/product/ProductService'
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
import { ArrowUpDown} from "lucide-react"


export default function ProductManagement() {
  const [stock, setStock] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [price, setPrice] = useState(0);
  const [comment, setComment] = useState("");
  const [description, setDescription] = useState("");
  const [product_name, setProductName] = useState("");
  const [category, setCategory] = useState("");

  const [token,setToken] = useState("");
  const [products,setProducts] = useState([{} as Product]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

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

  function loadData(category:string){
    getAllProducts(category, token)
      .then(data => {
          setProducts(data);
      })
  }

  useEffect(() => {
      let tokenLocalStorage = localStorage.getItem("token");
      if(tokenLocalStorage == null){
          setToken("token");
      }
      loadData("");
  },[]);

  const columns: ColumnDef<Product,any>[] = [
    {
      accessorKey: "product_name",
      accessorFn:(row) => row.product_name,
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
      cell: ({ row }) => <div className="lowercase">{row.getValue("product_name")}</div>,
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
      accessorKey: "product_note",
      accessorFn:(row) => row.product_note,
      header: () => <div >Note</div>,
      cell: ({ row }) => {
        return <div className="font-medium">{row.getValue("product_note")} /10</div>
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
                    Produit : {product.product_name}
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
                  <Button onClick={() => updateProduct(extractProductUpdateInterface(product))}>Sauvegarder</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>


            <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Ètes vous sur de vouloir supprimer le produit : {product.product_name}?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Cette aciton ne peut pas être annulée.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction>Confirmer</AlertDialogAction>
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
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrez les produits..."
          value={(table.getColumn("product_name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("product_name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
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
                <TableRow
                  key={row.id}
                >
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