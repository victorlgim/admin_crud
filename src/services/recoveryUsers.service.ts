import format from "pg-format";
import { client } from "../database";
import { IUserWithoutPassword, IUserReq } from "../interfaces/users.interfaces";
import { QueryConfig } from "pg";
import { AppError } from "../errors";

export const recoveryUsersService = async (userId: number): Promise<IUserWithoutPassword | any> => {

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

        if (querySelect.rows[0]?.active === true) {
            throw new AppError('This account is already active')
        }

        const insertQueryString: string = format(`
           UPDATE 
                users
           SET 
                active = true
           WHERE 
                id = $1;
        `);

        const queryConfig: QueryConfig = {
            text: insertQueryString,
            values: [userId],
        };

       await client.query(queryConfig);
      
       return querySelect.rows[0];   
};