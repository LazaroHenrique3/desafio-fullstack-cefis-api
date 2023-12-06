import { CustomError } from '../../errors/CustomErrors'
import { IResponseRepository } from '../../interfaces/IResponseRepository'
import { checkIfResponseExists, checkIfThisUserIsTheAuthorOfTheResponse } from '../utils/checkFunctions'

class DeleteResponseService {
    constructor(private ResponseService: IResponseRepository) { }

    public async execute(idResponse: number, idUserToken: number) {
        //verificando se a Response existe
        const quetionExists = await checkIfResponseExists(idResponse)
        if (!quetionExists) {
            return new CustomError('Resposta não encontrada.', 404)
        }

        //Verificando se o professor que solicitou a exclusão da resposta foi de fato quem a cadastrou
        const isAuthor = await checkIfThisUserIsTheAuthorOfTheResponse(idResponse, idUserToken)
        if(!isAuthor) {
            return new CustomError('Não tem permissão para esse tipo de ação.', 401)
        }

        const deletedResponse = await this.ResponseService.delete(idResponse)
        return deletedResponse
    }
}

export { DeleteResponseService }