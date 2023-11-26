import { IUserRepository } from '../../interfaces/IUserRepository'
import { checkIfUserExists } from '../utils/checkFunctions'

class UpdateUserService {
    constructor(private UserRepository: IUserRepository) { }

    public async execute(idUser: number, name: string) {
        //Verificando se o user existe
        const userExists = await checkIfUserExists(idUser)
        if (!userExists) {
            return new Error('Usuário não encontrado.')
        }

        const updatedUser = await this.UserRepository.update(idUser, name)
        return updatedUser
    }
}

export { UpdateUserService }