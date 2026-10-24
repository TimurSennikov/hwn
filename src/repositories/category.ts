import { Repository } from "../domain/category/repository";

type Database = typeof import("../prisma/db").db;

export interface NewCategory {
    title: string
};

export function createRepository(db: Database): Repository {
    async function getAll(take: number | undefined = undefined): Promise<any> {
        return new Promise(async (resolve, reject) => {
            let q = await db.orm.public.Category.all();

            if(take) {
                q = q.slice(0, take);
            }

            resolve(q);
        });
    }

    async function getById(id: number): Promise<any> {
        return new Promise(async (resolve, reject) => {
            let r = await db.orm.public.Category.where({ id: id }).all();

            return r;
        });
    }

    async function addCategory(category: NewCategory) {
        return new Promise<string>(async (resolve, reject) => {
            await db.orm.public.Category.create({
                title: category.title
            });

            resolve("ok");
        });
    }

    return {
        getAll,
        getById,
        addCategory
    };
}