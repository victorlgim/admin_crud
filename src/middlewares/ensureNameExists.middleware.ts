import { Request, Response, NextFunction } from 'express'
import { AppError } from '../errors'
import { QueryConfig } from 'pg'
import { IUserReq } from '../interfaces/users.interfaces'
import { client } from '../database'

const ensureNameExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  
    const id = req.params.id
    const { name } = req.body

    const selectString: string = `
        SELECT 
            *
        FROM 
            users
        WHERE
            id = $1;
 `
 
    const queryStrSelect: QueryConfig = {
      text: selectString,
      values: [id]
    }

    const querySelect: IUserReq = await client.query(queryStrSelect);

    if (querySelect.rows[0].name === name) {
     throw new AppError('You already have that name', 409)
 }

   next()
  
}

export default ensureNameExistsMiddleware