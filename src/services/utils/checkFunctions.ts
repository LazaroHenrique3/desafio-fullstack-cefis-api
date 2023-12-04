import { prisma } from '../../database/PrismaClientInstance'

export const checkIfUserExists = async (idUser: number): Promise<boolean> => {
    try {
        const userExists = await prisma.user.findUnique({
            where: {
                id: idUser
            }
        })

        return userExists !== null
    } catch (error) {
        console.error('Erro ao verificar existencia do usuário.', error)
        return false
    }
}

export const checkUserLinkedToCourses = async (idUser: number): Promise<boolean> => {
    try {
        const isLinkedToCourses = await prisma.course.findFirst({
            where: {
                teacherId: idUser
            }
        })

        return isLinkedToCourses !== null
    } catch (error) {
        console.error('Erro ao verificar relação com cursos.', error)
        return false
    }
}

export const checkIfUserEmailAlreadyExists = async (email: string): Promise<boolean> => {
    try {
        const emailAlreadyExists = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        return emailAlreadyExists !== null
    } catch (error) {
        console.error('Erro ao verificar duplicidade de email.', error)
        return true
    }
}

export const checkIfUserEmailAlreadyExistsInUpdate = async (email: string, idUser: number): Promise<boolean> => {
    try {
        const emailAlreadyExists = await prisma.user.findUnique({
            where: {
                email: email,
                NOT: {
                    id: idUser
                }
            },
        })

        return emailAlreadyExists !== null
    } catch (error) {
        console.error('Erro ao verificar duplicidade de email.', error)
        return true
    }
}

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

export const checkIfUserExistsAndIsStudent = async (idStudent: number): Promise<boolean> => {
    try {
        const isStudent = await prisma.user.findUnique({
            where: {
                id: idStudent
            }
        })

        return isStudent !== null && isStudent.role === 'STUDENT'
    } catch (error) {
        console.error('Erro ao verificar a autenticidade do aluno.', error)
        return false
    }
}

export const checkIfUserExistsAndIsTeacher = async (idStudent: number): Promise<boolean> => {
    try {
        const isStudent = await prisma.user.findUnique({
            where: {
                id: idStudent
            }
        })

        return isStudent !== null && isStudent.role === 'TEACHER'
    } catch (error) {
        console.error('Erro ao verificar a autenticidade do profesor.', error)
        return false
    }
}

export const checkIfStudentReachedQuestionLimitForCourse = async (idStudent: number, idCourse: number, limitOfQuestions: number): Promise<boolean> => {
    try {
        const totalOfQuestions = await prisma.question.count({
            where: {
                idStudent,
                idCourse
            }
        })

        return totalOfQuestions >= limitOfQuestions
    } catch (error) {
        console.error('Erro ao verificar se o aluno já atingiu o limite de perguntas.', error)
        return true
    }
}

export const checkIfThisTeacherOwnsTheCourse = async (idTeacher: number, idQuestion: number): Promise<boolean> => {
    try {
        //Buscando a questão e o curso vinculado a ela
        const question = await prisma.question.findUnique({
            where: {
                id: idQuestion
            },
            include: {
                course: {
                    select: {
                        teacherId: true
                    }
                }
            }
        })

        return question.course.teacherId === idTeacher
    } catch (error) {
        console.error('Erro ao verificar se o professor é proprietário do curso.', error)
        return false
    }
}