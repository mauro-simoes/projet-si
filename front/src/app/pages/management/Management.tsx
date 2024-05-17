"use client"
import React, { useEffect, useState } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UserManagement from './UserManagment'
import ProductManagement from './ProductsManagement';
import Header from '@/app/core/Header';
import Footer from '@/app/core/Footer';


export default function Management() {
  const [token,setToken] = useState("");

  useEffect(() => {
      let tokenLocalStorage = localStorage.getItem("token");
      if(tokenLocalStorage == null){
          setToken("token");
      }
  },[]);

  return (
    <>
      <Header onLoginPage={false}/>
      <Tabs defaultValue="produits" className="mx-auto w-[1000px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="produits">Produits</TabsTrigger>
          <TabsTrigger value="utilisateurs">Utilisateurs</TabsTrigger>
        </TabsList>
        <TabsContent value="produits">
          <ProductManagement />
        </TabsContent>
        <TabsContent value="utilisateurs">
          <UserManagement />
        </TabsContent>
      </Tabs>

      <Footer/>
    </>
  )
}