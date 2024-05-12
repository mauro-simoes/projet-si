export interface User {
    email: string,
    prenom: string,
    nom: string,
    adresse: string,
    avatar: string,
    note: number
}

export interface PasswordChangeRequest {
    motDePasseActuel: string
    nouveauMotDePasse : string
}