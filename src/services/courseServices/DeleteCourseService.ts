import { ICourseRepository } from '../../interfaces/ICourseRepository'

class DeleteCourseService {
    constructor (private CourseService: ICourseRepository) {}

    public async execute (idCourse: number) {
        const deletedCourse = await this.CourseService.delete(idCourse)
        return deletedCourse
    }
}

export { DeleteCourseService }