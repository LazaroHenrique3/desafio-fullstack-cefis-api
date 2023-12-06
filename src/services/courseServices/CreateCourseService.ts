import { ICourseRepository } from '../../interfaces/ICourseRepository'
import { checkIfUserExistsAndIsTeacher } from '../utils/checkUserFunctions'
import { CustomError } from '../../errors/CustomErrors'

class CreateCourseService {
    constructor (private CourseRepository: ICourseRepository) { }

    public async execute(title: string, duration: number, teacherId: number) {
        //Verificando se o professor existe e realmente é professor
        const teacherExists = await checkIfUserExistsAndIsTeacher(teacherId)
        if(!teacherExists){
            return new CustomError('Professor não encontrado ou este usuário não é um professor.', 404)
        }

        const newCourse = await this.CourseRepository.create(title, duration, teacherId)
        return newCourse
    }
}

export { CreateCourseService }