import { IUserRepository } from '../../interfaces/IUserRepository'

class CountUserService {
    constructor (private UserRepository: IUserRepository) {}

    public async execute(filter: string) {
        const countOfUsers = await this.UserRepository.count(filter)
        return countOfUsers
    }
}

export { CountUserService }