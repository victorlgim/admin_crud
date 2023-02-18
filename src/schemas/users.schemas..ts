import { hashSync } from 'bcryptjs'
import { z } from 'zod'

export const createUserSchema = z.object({
    name: z.string().min(3).max(45),
    email: z.string().email(),
    password: z.string().transform((pass) => hashSync(pass, 10)),
    admin: z.boolean().optional(),
    active: z.boolean().optional()
})

export const updateUserSchema = z.object({
    name: z.string().min(3).max(45).optional(),
    email: z.string().email().optional()
})



export const returnUserSchema = createUserSchema.extend({
    id: z.number(),
    admin: z.boolean(),
    active: z.boolean()
})

export const returnUserSchemaWithoutPassword = returnUserSchema.omit({password: true})

export const allUsersSchema = z.array(returnUserSchema)
