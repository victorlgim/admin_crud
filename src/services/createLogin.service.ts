import { QueryConfig } from "pg"
import { compare } from "bcryptjs"
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { client } from "../database"
import { AppError } from "../errors"
import { ILoginRequest } from "../interfaces/login.interfaces"
import { IUserReq } from "../interfaces/users.interfaces"

const createLoginService = async (payload: ILoginRequest): Promise<string> => {

    const queryString: string = `
        SELECT
            *
        FROM
            users
        WHERE
            email = $1;
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [payload.email]
    }

    const queryResult: IUserReq = await client.query(queryConfig)

    if (queryResult.rows[0]?.active === false) {
        throw new AppError('Your account has been deactivated', 401)
    } 

    if (queryResult.rowCount === 0) {
        throw new AppError('Wrong email or password', 401)
    }

    const matchPassword: boolean = await compare(payload.password, queryResult.rows[0].password)

    if (!matchPassword) {
        throw new AppError('Wrong email or password', 401)
    }

    const token: string = jwt.sign(
        {
            email: queryResult.rows[0].email,
            admin: queryResult.rows[0].admin
        },
        process.env.SECRET_KEY!,
        {
            expiresIn: '24h',
            subject: queryResult.rows[0].id.toString()
        }
    )

    return token

}

export default createLoginService