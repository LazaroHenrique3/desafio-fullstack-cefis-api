import * as createCourse from './Create'
import * as listCourse from './List'
import * as getCourseById from './GetById'
import * as deleteCourse from './Delete'
import * as updateCourse from './Update'

export const CourseController = {
    ...createCourse,
    ...listCourse,
    ...getCourseById,
    ...deleteCourse,
    ...updateCourse
}