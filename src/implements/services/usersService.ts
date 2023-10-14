import type { TUser } from '../../types/entity.js'
import type { TEntityWithRaw, TOrderBy } from '../../interfaces/dao/IEntityDao.js'
import type { TPaginatedList, TPagination } from '../../types/common.js'
import type { IUsersService } from '../../interfaces/services/IUsersService.js'
import type { IUsersDao } from '../../interfaces/dao/IUsersDao.js'
import { BadRequest, NotFound } from '../../errors/domain.js'

const userValidator = (user: Partial<TUser>) => {
    const { name, age } = user
    if (name && name.length > 20) throw new BadRequest('Invalid name')
    if (age && (age <= 0 || age > 120)) throw new BadRequest('Invalid age')
}
export class UsersService implements IUsersService {
    private usersDao: IUsersDao
    constructor(di: {
        usersDao: IUsersDao
    }) {
        this.usersDao = di.usersDao
    }

    async getUserById(userId: string): Promise<TUser | null> {
        const user = await this.usersDao.getUserById(userId)
        if (!user) throw new NotFound('User not found')
        return user
    }

    async getUsers(where: Partial<TUser>[], orderBy?: TOrderBy<TUser>): Promise<TUser[]> {
        return this.usersDao.getUsers(where.map(w => ({ ...w, deletedAt: null })), orderBy)
    }

    async getUsersPaginated(where?: TEntityWithRaw<TUser>, orderBy?: TOrderBy<TUser>, pagination?: TPagination): Promise<TPaginatedList<TUser>> {
        return this.usersDao.getUsersPaginated({ ...where, deletedAt: null }, orderBy, pagination)
    }

    async createUser(user: Partial<TUser>): Promise<TUser> {
        userValidator(user)
        return this.usersDao.createUser(user)
    }

    async saveUser(user: TUser): Promise<TUser> {
        userValidator(user)
        return this.usersDao.saveUser(user)
    }

    async updateUserById(userId: string, data: Partial<TUser>): Promise<TUser> {
        const user = await this.usersDao.getUserById(userId)
        if (!user) throw new NotFound('User not found')
        userValidator(data)
        return this.usersDao.updateUserById(userId, data)
    }

    async deleteUserById(userId: string): Promise<void> {
        const user = await this.usersDao.getUserById(userId)
        if (!user) throw new NotFound('User not found')
        await this.usersDao.deleteUserById(userId)
    }
}
