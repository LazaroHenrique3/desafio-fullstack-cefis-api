import { IUserRepository } from '../../interfaces/IUserRepository'

class UpdateUserService {
    constructor (private UserRepository: IUserRepository) {}

    public async execute(idUser: number, name: string) {
        const updatedUser = await this.UserRepository.update(idUser, name)
        return updatedUser
    }
}

export { UpdateUserService }