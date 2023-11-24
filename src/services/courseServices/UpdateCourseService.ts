import { ICourseRepository } from '../../interfaces/ICourseRepository'

class UpdateCourseService {
    constructor (private CourseRepository: ICourseRepository) {}

    public async execute(idCourse: number, title: string, duration: number) {
        const updatedCourse = await this.CourseRepository.update(idCourse, title, duration)
        return updatedCourse
    }
}

export { UpdateCourseService }