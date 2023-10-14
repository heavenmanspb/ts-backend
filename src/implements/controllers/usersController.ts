import type { TUser } from '../../types/entity.js'
import type { TEntityWithRaw, TOrderBy } from '../../interfaces/dao/IEntityDao.js'
import type { TPaginatedList, TPagination } from '../../types/common.js'
import type { IUsersController } from '../../interfaces/controllers/IUsersController.js'
import type { IUsersService } from '../../interfaces/services/IUsersService.js'

export class UsersController implements IUsersController {
    private usersService: IUsersService
    constructor(di: {
        usersService: IUsersService
    }) {
        this.usersService = di.usersService
    }

    async getUserById(userId: string): Promise<TUser | null> {
        return this.usersService.getUserById(userId)
    }

    async getUsers(where: Partial<TUser>[], orderBy?: TOrderBy<TUser>): Promise<TUser[]> {
        return this.usersService.getUsers(where, orderBy)
    }

    async getUsersPaginated(where?: TEntityWithRaw<TUser>, orderBy?: TOrderBy<TUser>, pagination?: TPagination): Promise<TPaginatedList<TUser>> {
        return this.usersService.getUsersPaginated(where, orderBy, pagination)
    }

    async createUser(user: Partial<TUser>): Promise<TUser> {
        return this.usersService.createUser(user)
    }

    async saveUser(user: TUser): Promise<TUser> {
        return this.usersService.saveUser(user)
    }

    async updateUserById(userId: string, data: Partial<TUser>): Promise<TUser> {
        return this.usersService.updateUserById(userId, data)
    }

    async deleteUserById(userId: string): Promise<void> {
        await this.usersService.deleteUserById(userId)
    }
}
