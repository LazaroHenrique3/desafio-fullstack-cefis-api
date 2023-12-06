import { IUserRepository } from '../../interfaces/IUserRepository'
import {
    checkIfUserEmailAlreadyExistsInUpdate,
    checkIfUserExists
} from '../utils/checkUserFunctions'
import { CustomError } from '../../errors/CustomErrors'
import { PasswordCrypto } from '../../externalServices/PasswordCrypto'
import { User } from '@prisma/client'

class UpdateUserService {
    constructor(private UserRepository: IUserRepository) { }

    public async execute(idUser: number, name: string, email: string, password: string, idUserToken: number) {
        //Verificando se o user existe
        const userExists = await checkIfUserExists(idUser)
        if (!userExists) {
            return new CustomError('Usuário não encontrado.', 404)
        }

        //Verificando se foi o próprio usuario que solicitou a alteração, um usuário não pode alterar outro
        if (idUser !== idUserToken) {
            return new CustomError('Não tem permissão para esse tipo de ação.', 401)
        }

        //Verificando se o email já foi cadastrado
        const emailExists = await checkIfUserEmailAlreadyExistsInUpdate(email, idUser)
        if (emailExists) {
            return new CustomError('Este email já esta em uso.', 409)
        }

        let updatedUser: User | CustomError

        //Significa que foi passado senha para alteração
        if (password !== '' && password !== undefined) {
            //Criptografando a senha utilizando bcrypt
            const hashedPassword = await PasswordCrypto.hashPassword(password)

            updatedUser = await this.UserRepository.update(idUser, name, email, hashedPassword)
        }

        //Se chegou aqui significa que não foi passado senha para alteração
        updatedUser = await this.UserRepository.updateWithoutPassword(idUser, name, email)

        //Caso for erro eu retorno normalmente
        if (updatedUser instanceof CustomError) return updatedUser

        //Caso contrário eu preciso remover a propriedade de password no retorno
        //Optei fazer aqui, pois considero regra de negócio
        // eslint-disable-next-line 
        const { password: _, ...userWithoutPassword } = updatedUser
        return userWithoutPassword
    }
}

export { UpdateUserService }