import Knex from 'knex'
import { camelToSnake, objectToCamel } from '../../utils/utils.js'

export const dbConnect = (options: Knex.Knex.Config) => Knex({
    ...options,
    postProcessResponse: result => result && (Array.isArray(result) ? result.map(row => objectToCamel(row)) : objectToCamel(result)),
    wrapIdentifier: (value, origImpl) => origImpl(camelToSnake(value)),
})
