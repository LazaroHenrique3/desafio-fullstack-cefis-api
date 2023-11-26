import * as createQuestion from './Create'
import * as ListQuestionsByIdCourse from './ListQuestionsByIdCourse'

export const QuestionController = {
    ...createQuestion,
    ...ListQuestionsByIdCourse
}