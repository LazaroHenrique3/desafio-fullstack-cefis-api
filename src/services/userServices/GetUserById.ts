import { IUserRepository } from '../../interfaces/IUserRepository'

class GetUserByIdService {
    constructor (private UserService: IUserRepository) {}

    public async execute (idUser: number) {
        const user = await this.UserService.getById(idUser)
        return user
    }
}

export { GetUserByIdService }