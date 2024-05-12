"use client"
import React, { useEffect, useState } from 'react'
import  {Link } from "react-router-dom";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {Avatar, AvatarImage } from '@/components/ui/avatar';
import { getUserInfo, updateUserPassword, updateUserProfile } from '../services/user/UserService';
import { PasswordChangeRequest, User } from '../models/user/UserModels';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function Profile() {

    const extractUserUpdateInterface = () => {
        return {
            email: email,
            prenom: user.prenom,
            nom: user.nom,
            adresse: adresse,
            note: user.note,
            avatar: avatar
        } as User
    }

    function extract64Base(e :any){
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            if(reader.result != null){
                if(reader.result.toString() !== ''){
                    setAvatar(reader.result.toString());
                } 
            }
        }
    }

    const [motDePasseActuel,setMotDePasseActuel] = useState("");
    const [nouveauMotDePasse,setNouveauMotDePasse] = useState("");

    const [token,setToken] = useState("");
    const [user,setUser] = useState({} as User);
    const [adresse,setAdresse] = useState("");
    const [email,setEmail] = useState("");
    const [avatar,setAvatar] = useState("");

    useEffect(() => {
        let tokenLocalStorage = localStorage.getItem("token");
        if(tokenLocalStorage == null){
            console.log("token is null");
            setToken("token");
        }
        console.log("token not null");
        getUserInfo(token)
        .then(data => {
            setUser(data);
            setAvatar(data.avatar);
        })
    },[]);

    function updateProfile() {
        if(user.email != email || user.adresse != adresse || user.avatar != avatar){
            updateUserProfile(extractUserUpdateInterface(), token)
            .then(data => {
                if(data){
                    toast.success("Profil mis à jour avec succes");
                }else{
                    toast.error("Echec de la mise à jour");
                }
            }).catch(error => {
                toast.error("Echec de la mise à jour", error);
            });
        }
    }

    function updatePassword() {
        updateUserPassword({motDePasseActuel, nouveauMotDePasse} as PasswordChangeRequest, token)
        .then(data => {
            if(data){
                toast.success("Mot de passe mis à jour avec succes");
            }else{
                toast.error("Echec de la mise à jour");
            }
        }).catch(error => {
            toast.error("Echec de la mise à jour", error);
        });
    }

    console.log(avatar);

    return (
        <Tabs defaultValue="account" className="mx-auto w-[600px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Profil</TabsTrigger>
            <TabsTrigger value="password">Mot de passe</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
                <CardHeader className='items-center'>
                    <CardDescription>
                        Mettez à jour vos informations ici.
                    </CardDescription>
                    <Avatar className="w-[100px] h-[100px]">
                        <AvatarImage src={avatar} />
                    </Avatar>
                    <div className="grid max-w-sm items-center gap-1.5 my-5">
                        <Input id="picture" type="file" accept=".png,.jpg,.jpeg" onChange={e => extract64Base(e)}/>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="new">Nom</Label>
                                <Input disabled={true} value={user?.nom}  />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="new">Prenom</Label>
                                <Input disabled={true} value={user?.prenom} />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="new">Email</Label>
                            <Input defaultValue={user?.email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="new">Adresse</Label>
                            <Input defaultValue={user?.adresse} onChange={e => setAdresse(e.target.value)} />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className='mx-auto' onClick={() => updateProfile()}>Sauvegarder</Button>
                </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader className='items-center'>
                <CardDescription>
                  Changez votre mot de passe ici.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Mot de passe actuel</Label>
                  <Input id="current" type="password" onChange={e => setMotDePasseActuel(e.target.value)}/>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">Nouveau mot de passe</Label>
                  <Input id="new" type="password" onChange={e => setNouveauMotDePasse(e.target.value)}/>
                </div>
              </CardContent>
              <CardFooter>
                <Button className='mx-auto' onClick={() => updatePassword()}>Sauvegarder</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
    );
}
