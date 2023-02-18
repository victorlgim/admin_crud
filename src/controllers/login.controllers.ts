import { Request, Response } from 'express'
import createLoginService from '../services/createLogin.service'

const createLoginController = async (req: Request, res: Response): Promise<Response> => {
    
    const token = await createLoginService(req.body)
    return res.json({token})
}

export {
    createLoginController
}