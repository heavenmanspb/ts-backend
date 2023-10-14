import type { TUser } from '../../types/entity.js'
import type {
    TPaginatedList,
    TEntityWithoutIdAndTimestamps,
    TPagination,
} from '../../types/common.js'
import type { IEntityDao, TEntityWithRaw, TOrderBy } from './IEntityDao.js'

export interface IUsersDao extends IEntityDao<TUser> {
    getUserById(userId: string): Promise<TUser | null>
    getUsers(where?: Partial<TUser>[], orderBy?: TOrderBy<TUser>): Promise<TUser[]>
    getUsersPaginated(where?: TEntityWithRaw<TUser>, orderBy?: TOrderBy<TUser>, pagination?: TPagination): Promise<TPaginatedList<TUser>>
    createUser(user: Partial<TUser>): Promise<TUser>
    saveUser(user: TUser): Promise<TUser>
    updateUserById(missionId: string, data: TEntityWithoutIdAndTimestamps<TUser>): Promise<TUser>
    deleteUserById(missionId: string): Promise<void>
}
