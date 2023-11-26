import { ICourseRepository } from '../../interfaces/ICourseRepository'
import { checkIfUserExistsAndIsTeacher } from '../utils/checkFunctions'

class CreateCourseService {
    constructor (private CourseRepository: ICourseRepository) { }

    public async execute(title: string, duration: number, teacherId: number) {
        //Verificando se o professor existe e realmente é professor
        const teacherExists = await checkIfUserExistsAndIsTeacher(teacherId)
        if(!teacherExists){
            return new Error('Professor não encontrado ou este usuário não é um professor.')
        }

        const newCourse = await this.CourseRepository.create(title, duration, teacherId)
        return newCourse
    }
}

export { CreateCourseService }