"use client"

import { LogInRequest } from '@/app/models/auth/AuthModels';
import { logIn } from '@/app/services/auth/AuthServices';
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
import Link from "next/link"
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
})

export default function LogIn() {

    // const [cookies, setCookie] = useCookies(['token','refreshToken'])

    const extractInterface = (values: z.infer<typeof formSchema>) => {
        return {
            email:values.email,
            motDePasse: values.password} as LogInRequest
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        logIn(extractInterface(values))
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
        <Card className="mx-auto max-w-sm shadow-lg">
            <CardHeader>
                <CardTitle className="text-xl">Connexion</CardTitle>
                <CardDescription>
                    Veuillez entrer vos informations
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={() => form.handleSubmit(onSubmit)}>
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
                        <Link href="#" className="underline">Inscrivez-vous</Link>
                    </div>
                </Form>
            </CardContent>
        </Card>
    );
}
