
export interface LogInRequest {
    email: String,
    motDePasse: String
}

export interface SignUpRequest {
    email: String,
    prenom: String,
    nom: String,
    adresse: String,
    motDePasse: String
}

export interface AuthResponse {
    token: String,
    refreshToken: String
}