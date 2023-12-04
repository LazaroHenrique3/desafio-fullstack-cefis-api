import { CustomError } from '../../errors/CustomErrors'
import { IUserRepository } from '../../interfaces/IUserRepository'

class GetUserByIdService {
    constructor(private UserService: IUserRepository) { }

    public async execute(idUser: number) {
        const user = await this.UserService.getById(idUser)

        //Caso for erro eu retorno normalmente
        if (user instanceof CustomError) return user

        //Caso contrário eu preciso remover a propriedade de password no retorno
        //Optei fazer aqui, pois considero regra de negócio
        // eslint-disable-next-line 
        const { password: _, ...userWithoutPassword } = user
        return userWithoutPassword
    }
}

export { GetUserByIdService }