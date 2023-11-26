import { IUserRepository } from '../../interfaces/IUserRepository'
import { checkIfUserExists } from '../utils/checkFunctions'
import { CustomError } from '../../errors/CustomErrors'

class UpdateUserService {
    constructor(private UserRepository: IUserRepository) { }

    public async execute(idUser: number, name: string) {
        //Verificando se o user existe
        const userExists = await checkIfUserExists(idUser)
        if (!userExists) {
            return new CustomError('Usuário não encontrado.', 404)
        }

        const updatedUser = await this.UserRepository.update(idUser, name)
        return updatedUser
    }
}

export { UpdateUserService }