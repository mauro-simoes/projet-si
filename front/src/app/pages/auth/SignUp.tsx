import { AuthResponse, SignUpRequest } from '@/app/models/auth/AuthModels';
import { signUp } from '@/app/services/auth/AuthServices';
import React, { useState } from 'react'
import { useCookies } from 'react-cookie';


export default function SignUp() {

    const [cookies, setCookie] = useCookies(['token','refreshToken'])

    const extractInterface = () => {
        return {
            email:email,
            prenom: prenom,
            nom: nom,
            adresse: adresse,
            motDePasse: password} as SignUpRequest
    }

    const register = () => {
        signUp(extractInterface())
        .catch()
        .then(authResponse => {
            console.log(authResponse);
            handleToken(authResponse);
        });
    }

    function handleToken(authResponse :AuthResponse){
        setCookie("token", authResponse.token, { path: '/', httpOnly:true });
        setCookie('refreshToken', authResponse.refreshToken, { path: '/', httpOnly:true });
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [adresse, setAdresse] = useState("");

    return (
        <div>SignUp</div>
    )
}