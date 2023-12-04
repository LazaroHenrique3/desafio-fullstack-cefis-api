import { RequestHandler } from 'express'
import { JWTServices } from '../externalServices/JWTServices'

export const ensureAuthenticated: RequestHandler = async (req, res, next) => {
    //Verificando se foi enviado algum token
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({
            errors: {
                default: 'Não autenticado'
            }
        })
    }

    //Verificando se o token é do tipo correto
    const [type, token] = authorization.split(' ')

    if (type !== 'Bearer') {
        return res.status(401).json({
            errors: {
                default: 'Não autenticado'
            }
        })
    }

    //Verificando se o token é válido JWT
    const jwtData = JWTServices.verify(token)

    if (jwtData === 'JWT_SECRET_NOT_FOUND') {
        return res.status(500).json({
            errors: {
                default: 'Erro ao verificar token!'
            }
        })
    } else if (jwtData === 'INVALID_TOKEN') {
        return res.status(401).json({
            errors: {
                default: 'Não autenticado'
            }
        })
    }

    req.headers.idUser = jwtData.uid.toString()
    req.headers.typeUser = jwtData.typeUser
    
    return next()
}