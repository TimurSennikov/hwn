import { Service } from "../services/category_types.js";
import { Handlers } from "./category_handlers.js";

import { Request, Response } from 'express';

export function createHandlers(service: Service): Handlers {
    async function getCategoriesHandler(req: Request, res: Response) {
        let { take } = req.query;

        if( (!take || !Number.parseInt(take as string)) ) {
            take = "10";
        }

        take = take.toString();

        if(take) {
            let take_n: number = Number.parseInt(take);
            return res.status(200).json(service.getAllCategories(take_n));
        }

        return res.status(200).json(service.getAllCategories(Number.parseInt(take)));
    }

    async function getCategoryByIdHandler(req: Request, res: Response) {
        let { id } = req.params;
        let idn = Number.parseInt(id as string);

        if(!idn) {
            return res.status(400).json({ok: false});
        }

        return await service.getCategoryById(idn) ? service.getCategoryById(idn) : res.status(404).json({ok: false});
    }

    async function createCategoryHandler(req: Request, res: Response) {
        let { title } = req.body;

        if(!title) {
            return res.status(422).json("Invalid data provided.");
        }

        await service.addNewCategory(title);
        return res.status(201).json({ok: true});
    }

    return {
        getCategoriesHandler,
        getCategoryByIdHandler,
        createCategoryHandler
    };
}