export interface User {
    id: number | string
    email: string
    password: string
    firstName: string
    lastName: string
    authdata?: string
    accessToken?: string
}
