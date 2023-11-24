import { ICourseRepository } from '../../interfaces/ICourseRepository'

class GetCourseByIdService {
    constructor (private CourseService: ICourseRepository) {}

    public async execute (idCourse: number) {
        const course = await this.CourseService.getById(idCourse)
        return course
    }
}

export { GetCourseByIdService }