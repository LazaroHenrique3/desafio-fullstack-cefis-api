import { IUserRepository } from '../../interfaces/IUserRepository'

class CreateUserService {
    constructor (private UserRepository: IUserRepository) { }

    public async execute(name: string, role: 'STUDENT' | 'TEACHER') {
        const newUser = await this.UserRepository.create(name, role)
        return newUser
    }
}

export { CreateUserService }