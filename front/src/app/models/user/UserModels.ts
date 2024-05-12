export interface User {
    userId: number,
    email: string,
    prenom: string,
    nom: string,
    adresse: string,
    avatar: string,
    note: number,
    status: string
}

export interface PasswordChangeRequest {
    motDePasseActuel: string
    nouveauMotDePasse : string
}

export interface AdminPasswordChangeRequest {
    userId: number
    motDePasse : string
}