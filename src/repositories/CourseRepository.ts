import { Course } from '@prisma/client'
import { ICourseRepository } from '../interfaces/ICourseRepository'
import { prisma } from '../database/PrismaClientInstance'
import { CustomError } from '../errors/CustomErrors'

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

    public async list(page: number, limit: number, filter: string, orderBy: 'asc' | 'desc'): Promise<Course[] | CustomError> {
        try {
            const courses = await prisma.course.findMany({
                skip: (page - 1) * limit,
                take: limit,
                where: {
                    title: {
                        contains: filter
                    }
                },
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

    public async count(filter: string): Promise<number | CustomError> {
        try {
            const countOfCourses = await prisma.course.count({
                where: {
                    title: {
                        contains: filter
                    }
                }
            })

            return countOfCourses
        } catch (error) {
            console.error(error)
            return new CustomError('Erro ao receber quantidade de registros.')
        }
    }

    public async getById(idCourse: number): Promise<Course | null | CustomError> {
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