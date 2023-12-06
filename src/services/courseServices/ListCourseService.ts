import { ICourseRepository } from '../../interfaces/ICourseRepository'

class ListCourseService {
    constructor (private CourseRepository: ICourseRepository) {}

    public async execute(page: number, limit: number, filter: string, orderBy: 'asc' | 'desc', teacherId: number | null) {
        const course = await this.CourseRepository.list(page, limit, filter, orderBy, teacherId)
        return course
    }
}

export { ListCourseService }