export interface User{
	id: string
	email: string
	passwordHash: string 
}

export interface UserInput{
	email: string,
	password: number
}

export type PublicUser = Pick<User, "id" | "email">