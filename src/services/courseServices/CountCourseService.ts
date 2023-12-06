import { ICourseRepository } from '../../interfaces/ICourseRepository'

class CountCourseService {
    constructor (private CourseRepository: ICourseRepository) {}

    public async execute(filter: string, teacherId: number | null) {
        const countOfCourses = await this.CourseRepository.count(filter, teacherId)
        return countOfCourses
    }
}

export { CountCourseService }