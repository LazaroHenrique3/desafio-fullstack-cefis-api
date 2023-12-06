import { prisma } from '../../database/PrismaClientInstance'

//Faz a checagem se o usuario existe
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

//Faz a verificação se o usuario esta vinculado a cursos, usado principalmente na exclusão
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

//Verifica se o email do usuario já existe no banco de dados, usado pricipalmente no create, já que o email é unique
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

//Verifica se o email do usuario já existe no banco de dados, usado pricipalmente no update, já que o email já existe porém é vinculado ao solicitante da alteração
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

//Faz a verificação se o usuario já existe no banco de dados e é um estudante, usado principalmente para criar perguntas
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

//Faz a verificação se o usuario já existe no banco de dados e é um professor, usado principalmente para criar respostas
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

//Faz verificação se o aluno já atingiu o limite de perguntas em determinado curso
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

//Faz a verificação se o professor em questão é proprietário do curso, usado principalmente ações específicas do curso, nesse caso compara 
//com o id do professor e da questão, usada para a criação de responses
export const checkIfThisTeacherOwnsTheCourseByIdQuestion = async (idTeacher: number, idQuestion: number): Promise<boolean> => {
    try {
        //Buscando a questão e o curso vinculado a ele
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

//Faz a verificação se o professor em questão é proprietário do curso, usado principalmente ações específicas do curso
export const checkIfThisTeacherOwnsTheCourseByIdTeacher = async (idTeacher: number, idCourse: number): Promise<boolean> => {
    try {
        //Buscando a questão e o curso vinculado a ele
        const isOwner = await prisma.course.findUnique({
            where: {
                id: idCourse,
                teacherId: idTeacher
            }
        })

        return isOwner !== null
    } catch (error) {
        console.error('Erro ao verificar se o professor é proprietário do curso.', error)
        return false
    }
}

//Verifica através do id da pergunta e do id do usuário que solicitou a ação se ele é autor da pergunta
export const checkIfThisUserIsTheAuthorOfTheQuestion = async (idQuestion: number, idUser: number): Promise<boolean> => {
    try {
        const question = await prisma.question.findUnique({
            where: {
                id: idQuestion
            }
        })

        //Comparando se o id do aluno vinculado a pergunta pesquisada é igual ao que veio pelo token
        return question.idStudent === idUser
    } catch (error) {
        console.error('Erro ao verificar se o aluno é autor da pergunta.', error)
        return false
    }
}

//Verifica através do id da resposta é do id do usuário que solicitou a ação se ele é autor da resposta
export const checkIfThisUserIsTheAuthorOfTheResponse = async (idResponse: number, idUser: number): Promise<boolean> => {
    try {
        const response = await prisma.response.findUnique({
            where: {
                id: idResponse
            },
            include: {
                question: {
                    include: {
                        course: {
                            select: {
                                teacherId: true
                            }
                        }
                    }
                }
            }
        })

        //Através da resposta chega até o curso e verifica se o solicitante da ação é o dono do curso
        return response.question.course.teacherId === idUser
    } catch (error) {
        console.error('Erro ao verificar se o aluno é autor da pergunta.', error)
        return false
    }
}