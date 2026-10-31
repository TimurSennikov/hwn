import { User } from "./entity";

export type NewUser = Omit<User, "id">

export interface UserRepositoryContract {
	createUser: (data: NewUser) => Promise<any>
    getUserByEmail: (email: string) => Promise<any | null>
    getUserById: (id: number) => Promise<any | null>
}