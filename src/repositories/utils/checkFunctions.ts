import { prisma } from '../../database/PrismaClientInstance'

export const checkIfUserExists = async (idUser: number) => {
    const recordExists = await prisma.user.findUnique({
        where: {
            id: idUser
        }
    })

    return recordExists !== null
}

export const checkIfCourseExists = async (idCourse: number) => {
    const recordExists = await prisma.course.findUnique({
        where: {
            id: idCourse
        }
    })

    return recordExists !== null
}

export const checkIfQuestionExists = async (idQuestion: number) => {
    const recordExists = await prisma.question.findUnique({
        where: {
            id: idQuestion
        }
    })

    return recordExists !== null
}

export const checkIfResponseExists = async (idResponse: number) => {
    const recordExists = await prisma.response.findUnique({
        where: {
            id: idResponse
        }
    })

    return recordExists !== null
}


