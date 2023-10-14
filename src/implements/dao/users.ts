import { randomUUID } from 'crypto'
import { EntityDao } from './entityDao.js'
import type { TUser } from '../../types/entity.js'
import type { IUsersDao } from '../../interfaces/dao/IUsersDao.js'
import type { TPaginatedList, TPagination } from '../../types/common.js'
import type { TEntityWithRaw, TOrderBy } from '../../interfaces/dao/IEntityDao.js'

export class UsersDao extends EntityDao<TUser> implements IUsersDao {
    async getUserById(userId: string): Promise<TUser | null> {
        return this.getOne({ id: userId, deletedAt: null })
    }

    async getUsers(where: Partial<TUser>[], orderBy?: TOrderBy<TUser>): Promise<TUser[]> {
        return this.getAllMultipleWhere(where, orderBy)
    }

    async getUsersPaginated(where?: TEntityWithRaw<TUser>, orderBy?: TOrderBy<TUser>, pagination?: TPagination): Promise<TPaginatedList<TUser>> {
        const result = await this.getAllPaginated(where, orderBy, pagination)
        console.log(result)
        return result
    }

    async createUser(user: Partial<TUser>): Promise<TUser> {
        return this.create({ ...user, id: randomUUID() })
    }

    async saveUser(user: TUser): Promise<TUser> {
        return this.save(user)
    }

    async updateUserById(userId: string, data: Partial<TUser>): Promise<TUser> {
        const result = await this.updateById(userId, {
            ...data,
            // updatedAt: new Date(),
            updatedAt: this.db.raw('?', [new Date().toISOString()]),
        })
        return result?.[0]
    }

    async deleteUserById(levelId: string): Promise<void> {
        await this.softDelete({ id: levelId })
    }
}
