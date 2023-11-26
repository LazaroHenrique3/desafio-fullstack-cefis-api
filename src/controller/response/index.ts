import * as createResponse from './Create'
import * as ListResponsesByIdQuestion from './ListResponsesByIdQuestion'

export const ResponseController = {
    ...createResponse,
    ...ListResponsesByIdQuestion
}