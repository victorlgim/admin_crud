import { client } from '../database'
import { IAllUsersReturn } from '../interfaces/users.interfaces'
import { QueryConfig } from 'pg'

export const listUsersService = async (): Promise<IAllUsersReturn> => {

    const queryString: string = `
        SELECT
            id, name, email, admin, active
        FROM
            users;
    `

    const queryResult = await client.query(queryString)

    return queryResult.rows

}

export const listProfileUser = async (userId: number): Promise<IAllUsersReturn> => {

    const getQueryString: string = `
     SELECT
        id, name, email, admin, active
     FROM
        users
     WHERE 
        id = $1
`

    const queryConfig: QueryConfig = {
    text: getQueryString,
    values: [userId],
};

    const queryResult = await client.query(queryConfig)

    return queryResult.rows[0]
    
}