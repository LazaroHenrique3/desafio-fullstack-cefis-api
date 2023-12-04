import { CustomError } from '../../errors/CustomErrors'
import { JWTServices } from '../../externalServices/JWTServices'
import { PasswordCrypto } from '../../externalServices/PasswordCrypto'
import { IUserRepository } from '../../interfaces/IUserRepository'

class SignInUserService {
    constructor(private UserRepository: IUserRepository) { }

    public async execute(email: string, password: string) {
        //Buscando o user pelo email
        const user = await this.UserRepository.getByEmail(email)
        if (user instanceof CustomError || user === null) {
            return new CustomError('Email e/ou senha inválidos.', 401)
        }

        //Comparando as senhas usando o bcrypt
        const passwordMatch = await PasswordCrypto.verifyPassword(password, user.password)
        if(!passwordMatch) {
            return new CustomError('Email e/ou senha inválidos.', 401)
        } else {
            //Criando o token JWT que será devolvido na resposta ao client
            const accessToken = JWTServices.sign({uid: user.id, typeUser: user.role})
            if (accessToken === 'JWT_SECRET_NOT_FOUND') {
                return new CustomError('Houve um erro gerar o token de acesso.', 500)
            }

            return {
                name: user.name,
                email: user.email,
                typeUser: user.role,
                accessToken: accessToken
            }

        }
    }
}

export { SignInUserService }