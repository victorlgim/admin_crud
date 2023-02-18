import { Request, Response, NextFunction } from 'express'
import { AppError } from '../errors'

const ensureIsAdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id)
    const authenticatedUser = req.user

    if (authenticatedUser.admin) {
       return next()
    }

    if(id !== req.user.id && !authenticatedUser.admin){
        throw new AppError('User don`t have permission', 403)
    }

    return next()

}

export default ensureIsAdminMiddleware