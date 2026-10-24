import { Handlers } from "../handlers/category_handlers.js";

import { Router } from "express";

export function createRouter(handlers: Handlers): Router {
    const categoryRouter = Router();

    categoryRouter.get("/", handlers.getCategoriesHandler);
    categoryRouter.get("/:id", handlers.getCategoryByIdHandler);
    categoryRouter.post("/", handlers.createCategoryHandler);

    return categoryRouter;
}