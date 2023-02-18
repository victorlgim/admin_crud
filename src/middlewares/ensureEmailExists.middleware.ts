import { Request, Response, NextFunction } from 'express'
import { AppError } from '../errors'
import { QueryConfig } from 'pg'
import { IUserReq } from '../interfaces/users.interfaces'
import { client } from '../database'

const ensureEmailExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    const { name, email } = req.body

    const selectString: string = `
    SELECT 
        *
    FROM 
        users
    WHERE
     email = $1;
 `
 
    const queryStrSelect: QueryConfig = {
      text: selectString,
      values: [email]
    }

    const querySelect: IUserReq = await client.query(queryStrSelect);

    if (querySelect.rows.length > 0) {
     throw new AppError('Email already exists', 409)
 }

   next()
  
}

export default ensureEmailExistsMiddleware