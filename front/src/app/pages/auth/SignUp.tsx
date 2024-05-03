"use client"

import { AuthResponse, SignUpRequest } from '@/app/models/auth/AuthModels';
import { signUp } from '@/app/services/auth/AuthServices';
import React from 'react'
// import { useCookies } from 'react-cookie';
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
  } from "@/components/ui/form"
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
    nom: z.string().min(1,"Veuillez entrer votre nom"),
    prenom: z.string().min(1,"Veuillez entrer votre prenom"),
    email: z.string().email("Veuillez entrer un mail valide"),
    password: z.string().min(8,"Le mot de passe doit contenir au moins 8 caractères"),
    adresse: z.string().min(1,"Veuillez entrer votre addresse"),
})

export default function SignUp() {

    // const [cookies, setCookie] = useCookies(['token','refreshToken'])

    const extractInterface = (values: z.infer<typeof formSchema>) => {
        return {
            email:values.email,
            prenom: values.prenom,
            nom: values.nom,
            adresse: values.adresse,
            motDePasse: values.password} as SignUpRequest
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        signUp(extractInterface(values))
        .catch(error => console.log("error",error))
        .then(authResponse => {
            console.log(authResponse);
            // if(authResponse != null)
            //     handleToken(authResponse);
        });
        console.log("values",values);
    }

    // function handleToken(authResponse :AuthResponse){
    //     setCookie("token", authResponse.token, { path: '/', httpOnly:true });
    //     setCookie('refreshToken', authResponse.refreshToken, { path: '/', httpOnly:true });
    // }

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-xl">Inscription</CardTitle>
                <CardDescription>
                    Veuillez entrer vos informations
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="nom"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nom</FormLabel>
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
                                        name="prenom"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Prenom</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
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
                                    name="adresse"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Adresse</FormLabel>
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
                        Vous avez déjà un compte ?{" "}
                        <Link to="/connexion" className="underline">Connectez-vous</Link>
                    </div>
                </Form>
            </CardContent>
        </Card>
    );
}
