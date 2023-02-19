import format from "pg-format";
import { client } from "../database";
import { IUserResult, IUserWithoutPassword, IUserRequest, IUserReq } from "../interfaces/users.interfaces";
import { QueryConfig } from "pg";

export const createUsersService = async (payload: IUserRequest): Promise<IUserWithoutPassword | any> => {

        let adm;
        payload.admin ? true : false;

        if (payload.admin === true) {
            adm = true;
        } else {
            adm = false;
        }

        const insertQueryString: string = format(`
            INSERT INTO 
                users ("name", "email", "password", "admin")
            VALUES 
                ($1, $2, $3, $4)
            RETURNING 
                *;
        `);


        const queryConfig: QueryConfig = {
            text: insertQueryString,
            values: [payload.name, payload.email, payload.password, adm],
        };


        const userInfoResult: IUserResult = await client.query(queryConfig);

        const selectString: string = `
            SELECT 
                id, name, email, admin, active
            FROM 
                users
            WHERE
                email = $1;
 `
 
    const queryStrSelect: QueryConfig = {
      text: selectString,
      values: [userInfoResult.rows[0].email]
    }


    const querySelect: IUserReq = await client.query(queryStrSelect);
  
    return querySelect.rows[0];

      
   
};