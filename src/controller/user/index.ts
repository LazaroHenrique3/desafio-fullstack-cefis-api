import * as signInUser from './SignIn'
import * as createUser from './Create'
import * as listUser from './List'
import * as getUserById from './GetById'
import * as deleteUser from './Delete'
import * as updateUser from './Update'

export const UserController = {
    ...signInUser,
    ...createUser,
    ...listUser,
    ...getUserById,
    ...deleteUser,
    ...updateUser
}