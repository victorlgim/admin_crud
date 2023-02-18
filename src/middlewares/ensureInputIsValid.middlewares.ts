import { NextFunction, Request, Response } from "express";
import { createUserSchema } from "../schemas/users.schemas.";
import { IUserRequest } from "../interfaces/users.interfaces";
import { ZodError, ZodTypeAny } from "zod";

const ensureDataIsValidMiddleware = (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction): Response | void => {
   try {
    const userData: IUserRequest = req.body;
    const validate = schema.parse(userData);
    req.body = validate

    return next();
   } catch (error: any) {
        if (error instanceof ZodError) {
            return res.status(400).json({ message: error.flatten().fieldErrors })
        }

        return res.status(500).json({ message: 'Internal Server Error' })
   }
   
  };

export default ensureDataIsValidMiddleware;
