import { Course } from '@prisma/client'
import { ICourseRepository, IListCourseResponse } from '../interfaces/ICourseRepository'
import { prisma } from '../database/PrismaClientInstance'
import { CustomError } from '../errors/CustomErrors'

//Implementando as funções de CRUD seguindo o que foi acordado na interfaçe, ou seja desde que fosse seguido a interface poderia ser feito com qualquer tecnologia
class CourseRepository implements ICourseRepository {

    public async create(title: string, duration: number, teacherId: number): Promise<Course | CustomError> {
        try {
            const newCourse = await prisma.course.create({
                data: {
                    title,
                    duration,
                    teacherId,
                }
            })

            return newCourse
        } catch (error) {
            console.error(error)
            return new CustomError('Erro ao criar registro.')
        }
    }

    public async list(page: number, limit: number, filter: string, orderBy: 'asc' | 'desc', teacherId: number | null): Promise<IListCourseResponse[] | CustomError> {
        try {
            //Tipando o condition
            const whereCondition: { title: { contains: string }, teacherId?: number } = {
                title: {
                    contains: filter
                }
            }

            //Pesquisa especifica por professor
            if (teacherId !== null) {
                whereCondition.teacherId = teacherId
            }

            const courses = await prisma.course.findMany({
                skip: (page - 1) * limit,
                take: limit,
                where: whereCondition,
                orderBy: {
                    id: orderBy
                },
                include: {
                    teacher: {
                        select: {
                            name: true,
                        },
                    },
                },
            })

            return courses
        } catch (error) {
            console.error(error)
            return new CustomError('Erro ao listar registro.')
        }
    }

    public async count(filter: string, teacherId: number | null): Promise<number | CustomError> {
        try {
            //Tipando o condition
            const whereCondition: { title: { contains: string }, teacherId?: number } = {
                title: {
                    contains: filter
                }
            }

            //Pesquisa especifica por professor
            if (teacherId !== null) {
                whereCondition.teacherId = teacherId
            }

            const countOfCourses = await prisma.course.count({
                where: whereCondition
            })

            return countOfCourses
        } catch (error) {
            console.error(error)
            return new CustomError('Erro ao receber quantidade de registros.')
        }
    }

    public async getById(idCourse: number): Promise<IListCourseResponse | null | CustomError> {
        try {
            const course = await prisma.course.findUnique({
                where: {
                    id: idCourse
                },
                include: {
                    teacher: {
                        select: {
                            name: true,
                        },
                    },
                    Question: {
                        include: {
                            student: {
                                select: {
                                    name: true,
                                },
                            },
                            Response: true,
                        },
                    },
                },
            })


            return course
        } catch (error) {
            console.error(error)
            return new CustomError('Erro ao buscar registro.')
        }
    }

    public async delete(idCourse: number): Promise<void | CustomError> {
        try {
            await prisma.course.delete({
                where: {
                    id: idCourse
                }
            })


        } catch (error) {
            console.error(error)
            return new CustomError('Erro ao excluir registro.')
        }
    }

    public async update(idCourse: number, title: string, duration: number): Promise<Course | CustomError> {
        try {
            const updatedCourse = await prisma.course.update({
                where: {
                    id: idCourse
                },
                data: {
                    title,
                    duration
                }
            })

            return updatedCourse
        } catch (error) {
            console.error(error)
            return new CustomError('Erro ao atualizar registro.')
        }
    }

}

export { CourseRepository }