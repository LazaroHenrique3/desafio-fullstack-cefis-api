import { IUserRepository } from '../../interfaces/IUserRepository'

class ListUserService {
    constructor (private UserRepository: IUserRepository) {}

    public async execute(page: number, limit: number, filter: string, orderBy: 'asc' | 'desc', typeUser: 'STUDENT' | 'TEACHER' | '') {
        const user = await this.UserRepository.list(page, limit, filter, orderBy, typeUser)
        return user
    }
}

export { ListUserService }