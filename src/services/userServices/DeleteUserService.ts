import { IUserRepository } from '../../interfaces/IUserRepository'
import { checkIfUserExists, checkUserLinkedToCourses } from '../utils/checkFunctions'
import { CustomError } from '../../errors/CustomErrors'

class DeleteUserService {
    constructor (private UserService: IUserRepository) {}

    public async execute (idUser: number) {
        //Verificando se o user existe
        const userExists = await checkIfUserExists(idUser)
        if(!userExists){
            return new CustomError('Usuário não encontrado.', 404)
        }

        //Verificando se o usuario esta vinculado a cursos caso ele seja professor
        const isUserLinkedToCourses = await checkUserLinkedToCourses(idUser)
        if(isUserLinkedToCourses){
            return new CustomError('Este professor possui cursos cadastrados.', 422)
        }

        const deletedUser = await this.UserService.delete(idUser)
        return deletedUser
    }
}

export { DeleteUserService }