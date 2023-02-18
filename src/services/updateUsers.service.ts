import { client } from '../database'
import { IUserReq, IUser, IUpdateRequest  } from '../interfaces/users.interfaces'
import { QueryConfig } from 'pg'
import format from 'pg-format'
import { AppError } from '../errors';

export const updateUsers = async (userId: number, object: IUpdateRequest): Promise<IUser> => {

    const { name, email } = object;

    const formatString: string = format(
        `
                UPDATE 
                    users 
                SET 
                   "name" = COALESCE($1, "name"),
                   "email" = COALESCE($2, "email")
                WHERE
                    id = $3
                RETURNING *;
            `
    );
  
    const queryConfig: QueryConfig = {
        text: formatString,
        values: [name, email, userId],
    };

    await client.query(queryConfig);

    const selectString: string = `
            SELECT 
                id, name, email, admin, active
            FROM 
                users
            WHERE
                id = $1;
 `
 
    const queryStrSelect: QueryConfig = {
      text: selectString,
      values: [userId]
    }

    if (!name && !email) {
       throw new AppError('You need to update your name and/or email', 400)
    }

    const querySelect: IUserReq = await client.query(queryStrSelect);
  
    return querySelect.rows[0];
   
};
  