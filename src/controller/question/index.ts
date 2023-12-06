import * as createQuestion from './Create'
import * as ListQuestionsByIdCourse from './ListQuestionsByIdCourse'
import * as deleteQuestion from './Delete'

export const QuestionController = {
    ...createQuestion,
    ...ListQuestionsByIdCourse,
    ...deleteQuestion
}