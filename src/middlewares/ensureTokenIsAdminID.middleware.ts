import { Request, Response, NextFunction } from 'express'
import { AppError } from '../errors'

const ensureIsAdminIdMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const authenticatedUser = req.user

    if(!authenticatedUser.admin){
        throw new AppError('User don`t have permission', 403)
    }

    return next()

}

export default ensureIsAdminIdMiddleware