import type { TUser } from '../../types/entity.js'
import type { TEntityWithRaw, TOrderBy } from '../dao/IEntityDao.js'
import type { TEntityWithoutIdAndTimestamps, TPaginatedList, TPagination } from '../../types/common.js'

export interface IUsersController {
    getUserById(userId: string): Promise<TUser | null>
    getUsers(where?: Partial<TUser>[], orderBy?: TOrderBy<TUser>): Promise<TUser[]>
    getUsersPaginated(where?: TEntityWithRaw<TUser>, orderBy?: TOrderBy<TUser>, pagination?: TPagination): Promise<TPaginatedList<TUser>>
    createUser(user: Partial<TUser>): Promise<TUser>
    saveUser(user: TUser): Promise<TUser>
    updateUserById(userId: string, data: TEntityWithoutIdAndTimestamps<TUser>): Promise<TUser>
    deleteUserById(userId: string): Promise<void>
}
