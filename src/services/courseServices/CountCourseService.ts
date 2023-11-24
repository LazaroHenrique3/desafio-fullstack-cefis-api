import { ICourseRepository } from '../../interfaces/ICourseRepository'

class CountCourseService {
    constructor (private CourseRepository: ICourseRepository) {}

    public async execute(filter: string) {
        const countOfCourses = await this.CourseRepository.count(filter)
        return countOfCourses
    }
}

export { CountCourseService }