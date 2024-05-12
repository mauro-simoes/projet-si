import { AuthResponse } from "../models/auth/AuthModels";
import { User } from "../models/user/UserModels";
import { RADIE, VALIDE } from "./constants";


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
    note: 4,
    status: VALIDE
} as User

export const allUsersMockData = [
    {
        userId:1,
        email: "nael@gmail.com",
        prenom: "Nael",
        nom: "Amirat",
        adresse: "154 avenue de Clichy, 75017 Paris",
        avatar: "https://airnfts.s3.amazonaws.com/nft-images/20220620/mamba_head_1655712480690.png",
        note: 3.5,
        status: RADIE
    } as User,
    {
        userId: 2,
        email: "maurosimoes@gmail.com",
        prenom: "Mauro",
        nom: "Simoes",
        adresse: "34 avenue des Champs Elysées, 75008 Paris",
        avatar: "https://github.com/shadcn.png",
        note: 4,
        status: VALIDE
    } as User,
    {
        userId: 3,
        email: "yessi@gmail.com",
        prenom: "Yessi",
        nom: "Racerlyn",
        adresse: "68 avenue de la Concorde, 75007 Paris",
        avatar: "https://sm.ign.com/ign_fr/cover/a/avatar-gen/avatar-generations_bssq.jpg",
        note: 5,
        status: VALIDE
    }as User,
] as User[]