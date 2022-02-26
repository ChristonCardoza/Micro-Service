import { Request, Response, NextFunction } from "express";

import { NotAuthorizedError } from "../errors|old/not-authorized-error";

export const requireAuth = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
        if(!req.currentUser) {
            return new NotAuthorizedError();
        }
        next();
}