import * as createResponse from './Create'
import * as ListResponsesByIdQuestion from './ListResponsesByIdQuestion'
import * as deleteResponse from './Delete'

export const ResponseController = {
    ...createResponse,
    ...ListResponsesByIdQuestion,
    ...deleteResponse
}