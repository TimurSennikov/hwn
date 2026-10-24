import { Request, Response } from 'express';

export interface Handlers {
    getCategoriesHandler: (req: Request, res: Response) => Promise<any>,
    getCategoryByIdHandler: (req: Request, res: Response) => Promise<any>,
    createCategoryHandler: (req: Request, res: Response) => Promise<any>
}