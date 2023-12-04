import { CustomError } from '../../errors/CustomErrors'
import { PasswordCrypto } from '../../externalServices/PasswordCrypto'
import { IUserRepository } from '../../interfaces/IUserRepository'
import { checkIfUserEmailAlreadyExists } from '../utils/checkFunctions'

class CreateUserService {
    constructor(private UserRepository: IUserRepository) { }

    public async execute(name: string, email: string, password: string, role: 'STUDENT' | 'TEACHER') {
        //Verificando se este email já foi cadastrado
        const emailExists = await checkIfUserEmailAlreadyExists(email)
        if (emailExists) {
            return new CustomError('Este email já esta em uso.', 409)
        }

        //Criptografando a senha utilizando bcrypt
        const hashedPassword = await PasswordCrypto.hashPassword(password)

        const newUser = await this.UserRepository.create(name, email, hashedPassword, role)

        //Caso for erro eu retorno normalmente
        if (newUser instanceof CustomError) return newUser

        //Caso contrário eu preciso remover a propriedade de password no retorno
        //Optei fazer aqui, pois considero regra de negócio
        // eslint-disable-next-line 
        const { password: _, ...userWithoutPassword } = newUser
        return userWithoutPassword
    }
}

export { CreateUserService }