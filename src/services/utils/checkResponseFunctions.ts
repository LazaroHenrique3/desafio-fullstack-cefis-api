import { prisma } from '../../database/PrismaClientInstance'

//Faz a verificação se a resposta já existe no banco de dados
export const checkIfResponseExists = async (idResponse: number): Promise<boolean> => {
    try {
        const recordExists = await prisma.response.findUnique({
            where: {
                id: idResponse
            }
        })

        return recordExists !== null
    } catch (error) {
        console.error('Erro ao verificar existencia da resposta.', error)
        return false
    }
}
