import { IUserRepository } from '../../interfaces/IUserRepository'
import { checkIfUserExists } from '../utils/checkFunctions'

class DeleteUserService {
    constructor (private UserService: IUserRepository) {}

    public async execute (idUser: number) {
        //Verificando se o user existe
        const userExists = await checkIfUserExists(idUser)
        if(!userExists){
            return new Error('Usuário não encontrado.')
        }

        const deletedUser = await this.UserService.delete(idUser)
        return deletedUser
    }
}

export { DeleteUserService }