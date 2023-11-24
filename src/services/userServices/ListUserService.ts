import { IUserRepository } from '../../interfaces/IUserRepository'

class ListUserService {
    constructor (private UserRepository: IUserRepository) {}

    public async execute(page: number, limit: number, filter: string, orderBy: 'asc' | 'desc') {
        const user = await this.UserRepository.list(page, limit, filter, orderBy)
        return user
    }
}

export { ListUserService }