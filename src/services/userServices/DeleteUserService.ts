import { IUserRepository } from '../../interfaces/IUserRepository'

class DeleteUserService {
    constructor (private UserService: IUserRepository) {}

    public async execute (idUser: number) {
        const deletedUser = await this.UserService.delete(idUser)
        return deletedUser
    }
}

export { DeleteUserService }