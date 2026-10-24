import { Service } from "../services/service_types.js";
import { Handlers } from "./handlers_types.js";

import { Request, Response } from 'express';

export function createHandlers(service: Service): Handlers {
    async function getPostsHandler(req: Request, res: Response) {
        let { category, take } = req.query;

        if( (!category || category.length == undefined || category.length == 0) ) {
            category = undefined;
        }
        else {
            category = category.toString();
        }

        if( (!take || !Number.parseInt(take as string)) ) {
            take = "10";
        }
        else {
            take = take.toString();
        }

        if(take) {
            let take_n: number = Number.parseInt(take);
            return res.status(200).json(service.getAllPosts(category, take_n));
        }

        return res.status(200).json(service.getAllPosts(category, Number.parseInt(take)));
    }

    async function getPostByIdHandler(req: Request, res: Response) {
        let { id } = req.params;
        let idn = Number.parseInt(id as string);

        if(!idn) {
            return res.status(400).json({ok: false});
        }

        return await service.getPostById(idn) ? service.getPostById(idn) : res.status(404).json({ok: false});
    }

    async function createPostHandler(req: Request, res: Response) {
        let { title, content, author, category } = req.body;

        if((!title) || (!content)) {
            return res.status(422).json("Invalid data provided.");
        }

        await service.addNewPost(title, content, author, category);
        return res.status(201).json({ok: true});
    }

    return {
        getPostsHandler,
        getPostByIdHandler,
        createPostHandler
    };
}