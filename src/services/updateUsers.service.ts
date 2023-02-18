import { client } from '../database'
import { IUserReq, IUser  } from '../interfaces/users.interfaces'
import { QueryConfig } from 'pg'
import format from 'pg-format'
import { AppError } from '../errors';

export const updateUsers = async (userId: number, object: any): Promise<IUser> => {

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

    const querySelect: IUserReq = await client.query(queryStrSelect);
  
    return querySelect.rows[0];
   
};
  