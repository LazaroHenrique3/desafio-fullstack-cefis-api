import { IUserRepository } from '../../interfaces/IUserRepository'

class CountUserService {
    constructor (private UserRepository: IUserRepository) {}

    public async execute(filter: string, typeUser: 'STUDENT' | 'TEACHER' | '') {
        const countOfUsers = await this.UserRepository.count(filter, typeUser)
        return countOfUsers
    }
}

export { CountUserService }