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

