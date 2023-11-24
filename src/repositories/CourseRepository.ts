import { Course } from '@prisma/client'
import { ICourseRepository } from '../interfaces/ICourseRepository'
import { prisma } from '../database/PrismaClientInstance'
import { checkIfCourseExists } from './utils/checkFunctions'

class CourseRepository implements ICourseRepository {

    public async create(title: string, duration: number, teacherId: number): Promise<Course | Error> {
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
            return new Error('Erro ao criar registro.')
        }
    }

    public async list(page: number, limit: number, filter: string, orderBy: 'asc' | 'desc'): Promise<Course[] | Error> {
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
                    title: orderBy
                }
            })

            return courses
        } catch (error) {
            console.error(error)
            return new Error('Erro ao listar registro.')
        }
    }

    public async count(filter: string): Promise<number | Error> {
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
            return new Error('Erro ao receber quantidade de registros.')
        }
    }

    public async getById(idCourse: number): Promise<Course | null | Error> {
        try {
            const course = await prisma.course.findUnique({
                where: {
                    id: idCourse
                }
            })

            return course
        } catch (error) {
            console.error(error)
            return new Error('Erro ao buscar registro.')
        }
    }

    public async delete(idCourse: number): Promise<void | null | Error> {
        try {
            const idExists = await checkIfCourseExists(idCourse)
            if (!idExists) return null

            await prisma.course.delete({
                where: {
                    id: idCourse
                }
            })


        } catch (error) {
            console.error(error)
            return new Error('Erro ao excluir registro.')
        }
    }

    public async update(idCourse: number, title: string, duration: number): Promise<Course | null | Error> {
        try {
            const idExists = await checkIfCourseExists(idCourse)
            if (!idExists) return null

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
            return new Error('Erro ao atualizar registro.')
        }
    }

}

export { CourseRepository }