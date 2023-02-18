import { QueryResult } from "pg"
import { z } from 'zod'
import { allUsersSchema, createUserSchema, returnUserSchema } from "../schemas/users.schemas."

type IUserRequest = z.infer<typeof createUserSchema>
type IUser = z.infer<typeof returnUserSchema>

type IUserWithoutPassword = Omit<IUser, 'password'>
type IUserReq = QueryResult<IUser>
type IUserResult = QueryResult<IUserWithoutPassword>
type IAllUsersReturn = z.infer<typeof allUsersSchema>

export {
    IUserRequest,
    IUser,
    IUserWithoutPassword,
    IUserResult,
    IUserReq,
    IAllUsersReturn
}