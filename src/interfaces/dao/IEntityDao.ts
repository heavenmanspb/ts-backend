import type { Knex } from 'knex'

export type TOrderBy<T> = { column: keyof T, order?: 'asc'|'desc' }[]
export type TEntityWithRaw<T> = Partial<{ [K in keyof T]: T[K] | Knex.Raw }>

export interface IEntityDao<T> {
    transacting(trx: Knex.Transaction): this
}
