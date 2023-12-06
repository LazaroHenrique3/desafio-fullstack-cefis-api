import { prisma } from '../../database/PrismaClientInstance'

//Faz a verificação se o curso já existe no banco de dados
export const checkIfCourseExists = async (idCourse: number): Promise<boolean> => {
    try {
        const recordExists = await prisma.course.findUnique({
            where: {
                id: idCourse
            }
        })

        return recordExists !== null
    } catch (error) {
        console.error('Erro ao verificar existencia do curso.', error)
        return false
    }
}