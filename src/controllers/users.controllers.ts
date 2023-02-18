import { Request, Response } from "express"
import { IUserRequest } from "../interfaces/users.interfaces"
import { createUsersService } from "../services/createUsers.service"
import { deleteUsersService } from "../services/deleteUsers.service"
import { listProfileUser, listUsersService } from "../services/listUsers.service"
import { recoveryUsersService } from "../services/recoveryUsers.service"
import { updateUsers } from "../services/updateUsers.service"

export const createUsersController = async (req: Request, res: Response): Promise<Response> => {
    
    const userData: IUserRequest = req.body
    const newUser = await createUsersService(userData)

    return res.status(201).json(newUser)

}

export const listUsersController = async (req: Request, res: Response): Promise<Response> => {
    
    const users = await listUsersService()
    
    return res.json(users)
}

export const listProfileController = async (req: Request, res: Response): Promise<Response> => {
   
    const users = await listProfileUser(req.user.id)
    
    return res.json(users)
}

export const updateProfileController = async (req: Request, res: Response): Promise<Response> => {
    console.log(req.user)
    const id = parseInt(req.params.id)
    const body = req.body
    const newUpdate = await updateUsers(id, body)
    
    return res.json(newUpdate)
}

export const deleteProfileController = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id)
    const users = await deleteUsersService(id)
    
    return res.status(204).json(users)
}

export const recoveryProfileController = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id)
    const users = await recoveryUsersService(id)
    
    return res.status(200).json(users)
}