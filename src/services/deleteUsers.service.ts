import format from "pg-format";
import { client } from "../database";
import { IUserWithoutPassword, IUserReq } from "../interfaces/users.interfaces";
import { QueryConfig } from "pg";

export const deleteUsersService = async (userId: number): Promise<IUserWithoutPassword | any> => {

        const insertQueryString: string = format(`
           UPDATE 
                users
           SET 
                active = false 
           WHERE 
                id = $1;
        `);

        const queryConfig: QueryConfig = {
            text: insertQueryString,
            values: [userId],
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