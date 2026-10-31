import type { Request, Response } from "express"
import type { AuthCredentialsBody } from "../transport/dto/user/requests"

export interface UserHandlerContract{
    register: (
        req: Request<{}, {}, AuthCredentialsBody>,
        res: Response,
    ) => Promise<void>
    login: (
        req: Request<{}, {}, AuthCredentialsBody>,
        res: Response,
    ) => Promise<void>,
    refresh: (
        req: Request,
        res: Response
    ) => Promise<void>
    me: (
        req: Request,
        res: Response
    ) => Promise<void>
}