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


export default function UserManagement() {
  const [motDePasse, setMotDePasse] = useState("");

  const [token,setToken] = useState("");
  const [users,setUsers] = useState([{} as User]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  function approveAccount(userId :number){
    approveUserAccount(userId, token).
    then(data => {
      if(data){
        toast.success("Profil validé avec succes");
      }else{
        toast.error("Echec de la validation");
      }
    }).
    catch(error => {
      toast.error("Echec de la validation", error);
    });
    loadData();
  }

  function suspendAccount(userId :number){
    suspendUserAccount(userId, token).
    then(data => {
      if(data){
        toast.success("Profil radié avec succes");
      }else{
        toast.error("Echec de la radiation");
      }
    }).
    catch(error => {
      toast.error("Echec de la radiation", error);
    });
    loadData();
  }

  function changePassword(userId :number, motDePasse: string){
    changeUserPasswordAsAdmin({userId, motDePasse} as AdminPasswordChangeRequest, token).
    then(data => {
      if(data){
        toast.success("Mot de passe de l'utilisateur " + userId + " changé avec succes");
      }else{
        toast.error("Echec de la mise à jour");
      }
    }).
    catch(error => {
      toast.error("Echec de la mise à jour", error);
    });
    setMotDePasse("");
  }

  function loadData(){
    getAllUsers(token)
      .then(data => {
          setUsers(data);
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
            <CardDescription className="text-center">Gerez les utilisateurs ici</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead >Note</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.userId}>
                      <TableCell>
                        <div className="font-medium">{user?.nom?.toUpperCase()} {user.prenom}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {user.email}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge className="text-xs" variant={user.status == RADIE ? "destructive" : "outline"}>
                          {ACCOUNT_STATUSES[user.status]}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Rating
                          style={{ maxWidth: 100 }}
                          value={user.note}
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
                            {user.status == RADIE ?
                              <DropdownMenuItem className='cursor-pointer' onClick={() => approveAccount(user.userId)}>Valider</DropdownMenuItem>
                              :
                              <DropdownMenuItem className='cursor-pointer' onClick={() => suspendAccount(user.userId)}>Radier</DropdownMenuItem>}
                            <DropdownMenuItem className='cursor-pointer' onClick={() => setIsEditDialogOpen(true)}>Modifier mot de passe</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Modifier mot de passe</DialogTitle>
                              <DialogDescription>
                                Utilisateur : {user?.nom?.toUpperCase()} {user.prenom} - {user.email}
                              </DialogDescription>
                            </DialogHeader>
                              <div className="items-center ">
                                <Label className="my-2.5">Mot de passe</Label>
                                <Input className="col-span-3" onChange={(e) => {setMotDePasse(e.target.value)}}/>
                              </div>
                            <DialogFooter>
                              <Button onClick={() => changePassword(user.userId, motDePasse)}>Sauvegarder</Button>
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