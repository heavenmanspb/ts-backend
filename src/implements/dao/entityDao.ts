import type { Knex } from 'knex'
import type { TPagination } from '../../types/common.js'
import { throwDbError } from '../../errors/database.js'
import type {
    IEntityDao,
    TOrderBy,
    TEntityWithRaw,
} from '../../interfaces/dao/IEntityDao.js'

export class EntityDao<T> implements IEntityDao<T> {
    protected db: Knex
    protected readonly tableName: string
    protected trx: Knex.Transaction
    constructor(db: Knex, tableName: string) {
        this.db = db
        this.tableName = tableName
    }

    transacting(trx: Knex.Transaction) {
        this.trx = trx
        return this
    }

    protected get qb(): Knex.QueryBuilder {
        const qb = this.db.table(this.tableName)
        return this.trx && !this.trx.isCompleted() ? qb.transacting(this.trx) : qb
    }

    protected async create(entity: TEntityWithRaw<T>): Promise<T> {
        const query = this.qb.insert(entity, '*')
        const [row] = await query.catch(throwDbError)
        return row
    }

    protected async getById(id: string): Promise<T> {
        return this.qb
            .where({ id })
            .first()
    }

    protected async getOne(where: TEntityWithRaw<T>, orderBy?: TOrderBy<T>): Promise<T> {
        const query = this.qb
            .select('*')
            .where({ ...(where ?? {}) })
            .first()

        if (orderBy) query.orderBy(orderBy)

        return query
    }

    protected async getAll(where?: TEntityWithRaw<T>, orderBy?: TOrderBy<T>): Promise<Array<T>> {
        const query = this.qb
            .select('*')
            .where({ ...(where ?? {}) })
        if (orderBy) query.orderBy(orderBy)
        return query
    }

    protected async getAllMultipleWhere(where?: TEntityWithRaw<T>[], orderBy?: TOrderBy<T>): Promise<Array<T>> {
        const query = this.qb.select('*')

        if (where && where.length > 0) {
            query.andWhere(builder => {
                where.forEach(conditions => {
                    builder.orWhere(subBuilder => {
                        Object.keys(conditions).forEach(key => {
                            if (conditions[key] === null) subBuilder.whereNull(key)
                            else subBuilder.andWhere(key, '=', conditions[key])
                        })
                    })
                })
            })
        }

        if (orderBy) query.orderBy(orderBy)

        return query
    }

    protected async updateById(id: string, data: Partial<TEntityWithRaw<T>>): Promise<T | null> {
        const query = this.qb
            .where({ id })
            .update(data)
            .returning('*')
        const [result] = await query.catch(throwDbError)
        return result ?? null
    }

    protected async delete(where: TEntityWithRaw<T>): Promise<number> {
        return this.qb.where(where).del()
    }

    protected async softDelete(where: TEntityWithRaw<T>): Promise<number> {
        const result = await this.qb.where(where)
            .update({ deletedAt: new Date() })
            .returning('*')
        return result.length
    }

    protected async save(entity: T & { id: string, updatedAt?: Date }, optimisticLocking = false): Promise<T> {
        const { id, ...rest } = entity
        const query = this.qb
            .where({ id })
            .update({
                ...rest,
                ...(optimisticLocking ? { updatedAt: new Date() } : {}),
            })
            .returning('*')

        if (optimisticLocking) query.andWhere({ updatedAt: rest.updatedAt })

        const [result] = await query.catch(throwDbError)
        return result
    }

    protected async getAllPaginated(where?: TEntityWithRaw<T>, orderBy?: TOrderBy<T>, pagination?: TPagination): Promise<{ items: Array<T>, total: number} & TPagination> {
        const { limit, offset } = pagination ?? {}
        const whereWithoutUndefined = Object.fromEntries(Object.entries(where ?? {}).filter(([_, v]) => v !== undefined))
        const query = this.qb.where({ ...(whereWithoutUndefined ?? {}) })
        const { 'count(*)': total } = await query.clone().count().first()
        query.select('*')
        if (orderBy) query.orderBy(orderBy)
        if (limit !== undefined) query.limit(limit > 100 ? 100 : limit)
        if (offset !== undefined) query.offset(offset)
        const items = await query
        return { items, limit, offset, total: Number(total) }
    }
}
