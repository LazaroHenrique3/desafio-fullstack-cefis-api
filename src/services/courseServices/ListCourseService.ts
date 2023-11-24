import { ICourseRepository } from '../../interfaces/ICourseRepository'

class ListCourseService {
    constructor (private CourseRepository: ICourseRepository) {}

    public async execute(page: number, limit: number, filter: string, orderBy: 'asc' | 'desc') {
        const course = await this.CourseRepository.list(page, limit, filter, orderBy)
        return course
    }
}

export { ListCourseService }