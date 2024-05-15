export interface User {
    id: number,
    mail: string,
    firstName: string,
    lastName: string,
    address: string,
    password: string
    avatar: string,
    note: number,
    accountStatus: string
}

export interface PasswordChangeRequest {
    currentPassword: string
    newPassword : string
}

export interface AdminPasswordChangeRequest {
    id: number
    newPassword : string
}