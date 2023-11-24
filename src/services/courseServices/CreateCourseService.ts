import { ICourseRepository } from '../../interfaces/ICourseRepository'

class CreateCourseService {
    constructor (private CourseRepository: ICourseRepository) { }

    public async execute(title: string, duration: number, teacherId: number) {
        const newCourse = await this.CourseRepository.create(title, duration, teacherId)
        return newCourse
    }
}

export { CreateCourseService }