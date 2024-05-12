"use client"

import { AuthResponse, LogInRequest } from '@/app/models/auth/AuthModels';
import { logIn } from '@/app/services/auth/AuthServices';
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";


import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import  {Link } from "react-router-dom";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    email: z.string().email("Veuillez entrer un mail valide"),
    password: z.string().min(8,"Le mot de passe doit contenir au moins 8 caractères"),
});

const initialState = {
    email:"",
    password:""
} 

export default function LogIn() {

    const extractInterface = (values: z.infer<typeof formSchema>) => {
        return {
            email:values.email,
            motDePasse: values.password} as LogInRequest
    }

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues:initialState,
        resolver: zodResolver(formSchema),
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        logIn(extractInterface(values))
        .catch(error => console.log("error",error))
        .then(authResponse => {
            if(authResponse != null)
                handleToken(authResponse);
        });
    }

    function handleToken(authResponse :AuthResponse){
        localStorage.setItem("token", authResponse.token);
        localStorage.setItem("refreshToken", authResponse.refreshToken);
    }

    return (
        <Card className="mx-auto max-w-sm shadow-lg">
            <CardHeader>
                <CardTitle className="text-xl">Connexion</CardTitle>
                <CardDescription>
                    Veuillez entrer vos informations
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form method="POST" onSubmit={() => form.handleSubmit(onSubmit)}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mot de Passe</FormLabel>
                                            <FormControl>
                                                <Input type="password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button type="submit" className="w-full">S'inscrire</Button>
                        </div>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Vous n'avez pas de compte ?{" "}
                        <Link to="/" className="underline">Inscrivez-vous</Link>
                    </div>
                </Form>
            </CardContent>
        </Card>
        
    );
}
