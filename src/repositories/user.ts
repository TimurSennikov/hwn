import type { UserRepositoryContract } from "../domain/user/repository";

type Database = typeof import("../prisma/db").db;

export function createUserRepositoryContract(db: Database): UserRepositoryContract {
    return({
        async createUser(data) {
            try {
                const user = await db.orm.public.User.create(data);
                return user;
            }
            catch (error) {
                throw new Error("Failed to create user: " + error);
            }
        },

        async getUserByEmail(email) {
            return await db.orm.public.User.where({ email: email }).first();
        },

        async getUserById(id) {
            return await db.orm.public.User.where({ id: id }).first();
        }
    })
}