import { NewCategory } from "../../repositories/category.js";

export interface Repository {
    getAll: (take: number | undefined) => Promise<any>,
    getById: (id: number) => Promise<any>,
    addCategory: (category: NewCategory) => Promise<string>
};