import { prisma } from '../../database/PrismaClientInstance'

//Faz a verificação se a pergunta já existe no banco de dados
export const checkIfQuestionExists = async (idQuestion: number): Promise<boolean> => {
    try {
        const recordExists = await prisma.question.findUnique({
            where: {
                id: idQuestion
            }
        })

        return recordExists !== null
    } catch (error) {
        console.error('Erro ao verificar existencia da questão.', error)
        return false
    }
}