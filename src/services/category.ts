import { Repository } from "../domain/category/repository.js";
import { Service } from "./category_types.js";
import { NewCategory } from "../repositories/category.js";

export function createService(repository: Repository): Service {
    function getAllCategories(take: number) {
        return repository.getAll(take);
    }

    function getCategoryById(id: number) {
        return repository.getById(id);
    }

    function addNewCategory(title: string) {
        let category: NewCategory = {
            title: title
        };

        return repository.addCategory(category);
    }

    return {
        getAllCategories,
        getCategoryById,
        addNewCategory
    }
}