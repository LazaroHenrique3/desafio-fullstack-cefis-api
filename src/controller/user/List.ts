import { Request, Response } from 'express'
import * as yup from 'yup'

import { DefaultQueryParams } from '.././constants/DefaultQueryParams'
import { ListUserService } from '../.././services/userServices/ListUserService'
import { CountUserService } from '../.././services/userServices/CountUserService'
import { UserRepository } from '../../repositories/UserRepository'
import { validation } from '../../middlewares/Validation'

//Validando os query Params
interface IQueryProps {
    page?: number,
    limit?: number,
    filter?: string,
    orderBy?: 'asc' | 'desc'
}

//Midleware
export const listUserValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(yup.object().shape({
        page: yup.number().optional().moreThan(0),
        limit: yup.number().optional().moreThan(0),
        filter: yup.string().optional(),
        orderBy: yup.string().oneOf(['asc', 'desc']).optional()
    }))
}))

export const listUser = async (request: Request<{}, {}, {}, IQueryProps>, response: Response) => {
    const { page, limit, filter, orderBy } = request.query

    const listUsers = new ListUserService(new UserRepository())
    const countUsers = new CountUserService(new UserRepository())

    const resultUsers = await listUsers.execute(
        Number(page) || DefaultQueryParams.DEFAULT_PAGE, 
        Number(limit) || DefaultQueryParams.DEFAULT_LIMIT, 
        filter || DefaultQueryParams.DEFAULT_FILTER, 
        orderBy as 'asc' | 'desc' || DefaultQueryParams.DEFAULT_ORDER_BY
    )

    const resultCountUsers = await  countUsers.execute(
        filter || DefaultQueryParams.DEFAULT_FILTER
    )

    if(resultUsers instanceof Error){
        return response.status(500).json({
            errors: { default: resultUsers.message }
        })
    } else if (resultCountUsers instanceof Error) {
        return response.status(500).json({
            errors: { default: resultCountUsers.message }
        })
    }

    if(resultUsers.length === 0){
        return response.status(404).json({
            errors: { default: 'Registro(s) não encontrado(s).' }
        })
    }

    //Adicionando a quantidade de usuarios encontrados no Header
    response.setHeader('access-control-expose-headers', 'x-total-count')
    response.setHeader('x-total-count', resultCountUsers)

    return response.status(200).json(resultUsers)
}