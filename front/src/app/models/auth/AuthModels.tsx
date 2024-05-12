
export interface LogInRequest {
    email: string,
    motDePasse: string
}

export interface SignUpRequest {
    email: string,
    prenom: string,
    nom: string,
    adresse: string,
    motDePasse: string
}

export interface AuthResponse {
    token: string,
    refreshToken: string
}