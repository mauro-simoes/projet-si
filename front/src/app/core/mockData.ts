import { AuthResponse } from "../models/auth/AuthModels";
import { User } from "../models/user/UserModels";


export const authenticationMockData = {
    token: "token",
    refreshToken: "refreshToken"
} as AuthResponse

export const userMockData = {
    email: "maurosimoes@gmail.com",
    prenom: "Mauro",
    nom: "Simoes",
    adresse: "34 avenue des Champs Elysées, 75008 Paris",
    avatar: "https://github.com/shadcn.png",
    note: 4
} as User