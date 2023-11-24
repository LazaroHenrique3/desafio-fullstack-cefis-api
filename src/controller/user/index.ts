import * as createUser from './Create'
import * as listUser from './List'
import * as getUserById from './GetById'
import * as deleteUser from './Delete'
import * as updateUser from './Update'

export const UserController = {
    ...createUser,
    ...listUser,
    ...getUserById,
    ...deleteUser,
    ...updateUser
}