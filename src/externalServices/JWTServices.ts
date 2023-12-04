import * as jwt from 'jsonwebtoken'

interface IJwtData {
    uid: number
    typeUser: string
}

//Cria um token válido
const sign = (data: IJwtData): string | 'JWT_SECRET_NOT_FOUND' => {
    if(!process.env.JWT_SECRET) return 'JWT_SECRET_NOT_FOUND'

    return jwt.sign(data, process.env.JWT_SECRET)
}

//Faz a verificação se o token é válido
const verify = (token: string): IJwtData | 'JWT_SECRET_NOT_FOUND' | 'INVALID_TOKEN' => {
    //Verificando se foi informado uma JWT_SECRET
    if(!process.env.JWT_SECRET) return 'JWT_SECRET_NOT_FOUND'

    try {
        //Executando a função nativa do jwt para fazer a verificação se o token é válido
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(typeof decoded === 'string'){
            return 'INVALID_TOKEN'
        }

        //Significa que o token é valido e esta sendo passado a sinformações que foram incorporadas no token no momento da criação dele
        return decoded as IJwtData
    } catch (error) {
        return 'INVALID_TOKEN'
    }
}

export const JWTServices = {
    sign,
    verify
}