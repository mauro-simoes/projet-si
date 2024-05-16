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
import { ACCOUNT_STATUSES, RADIE, TOKEN, VALIDE } from '../../core/constants'
import { toast } from 'sonner'
import { Input} from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useNavigate } from 'react-router-dom'


export default function UserManagement() {
  const [motDePasse, setMotDePasse] = useState("");

  const navigator = useNavigate();

  const [users,setUsers] = useState([{} as User]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  function approveAccount(id :number){
    let tokenLocalStorage = localStorage.getItem(TOKEN);
    if(tokenLocalStorage == null){
      navigator("/accueil",{replace:true});
    }else{
      approveUserAccount(id, tokenLocalStorage).
      then(data => {
        if(data){
          toast.success("Profil validé avec succes");
          loadData(tokenLocalStorage);
        }else{
          toast.error("Echec de la validation");
        }
      }).
      catch(error => {
        toast.error("Echec de la validation" + error.response.data.message);
      });
    }
  }

  function suspendAccount(id :number){
    let tokenLocalStorage = localStorage.getItem(TOKEN);
    if(tokenLocalStorage == null){
      navigator("/accueil",{replace:true});
    }else{
      suspendUserAccount(id, tokenLocalStorage).
      then(data => {
        if(data){
          toast.success("Profil radié avec succes");
          loadData(tokenLocalStorage);
        }else{
          toast.error("Echec de la radiation");
        }
      }).
      catch(error => {
        toast.error("Echec de la radiation" + error.response.data.message);
      });
    }
  }

  function changePassword(id :number, newPassword: string){
    let tokenLocalStorage = localStorage.getItem(TOKEN);
    if(tokenLocalStorage == null){
      navigator("/accueil",{replace:true});
    }else{
      changeUserPasswordAsAdmin({id, newPassword} as AdminPasswordChangeRequest, tokenLocalStorage).
      then(data => {
        if(data){
          toast.success("Mot de passe de l'utilisateur " + id + " changé avec succes");
        }else{
          toast.error("Echec de la mise à jour");
        }
      }).
      catch(error => {
        toast.error("Echec de la mise à jour" + error.response.data.message);
      });
      setMotDePasse("");
      setIsEditDialogOpen(false);
    }
  }

  function loadData(token:string){
    getAllUsers(token)
      .then(response => {
          if(response.data != null){
            setUsers(response.data);
          }
      }).catch(error => {
        toast.error("Les utilisateurs n'ont pas pu etre recuperes : " + error.response.data.message);
     });
  }

  useEffect(() => {
      let tokenLocalStorage = localStorage.getItem(TOKEN);
      if(tokenLocalStorage == null){
        navigator("/accueil",{replace:true});
      }else{
        loadData(tokenLocalStorage);
      }
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
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                      <TableCell>
                        <div className="font-medium">{user?.lastName?.toUpperCase()} {user.firstName}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {user.mail}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge className="text-xs" variant={user.accountStatus == RADIE ? "destructive" : "outline"}>
                          {ACCOUNT_STATUSES[user.accountStatus]}
                        </Badge>
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
                            {user.accountStatus == RADIE ?
                              <DropdownMenuItem className='cursor-pointer' onClick={() => approveAccount(user.id)}>Valider</DropdownMenuItem>
                              :
                              <DropdownMenuItem className='cursor-pointer' onClick={() => suspendAccount(user.id)}>Radier</DropdownMenuItem>}
                            <DropdownMenuItem className='cursor-pointer' onClick={() => setIsEditDialogOpen(true)}>Modifier mot de passe</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Modifier mot de passe</DialogTitle>
                              <DialogDescription>
                                Utilisateur : {user?.lastName?.toUpperCase()} {user.firstName} - {user.mail}
                              </DialogDescription>
                            </DialogHeader>
                              <div className="items-center ">
                                <Label className="my-2.5">Mot de passe</Label>
                                <Input className="col-span-3" onChange={(e) => {setMotDePasse(e.target.value)}}/>
                              </div>
                            <DialogFooter>
                              <Button onClick={() => changePassword(user.id, motDePasse)}>Sauvegarder</Button>
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