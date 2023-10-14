import { dbConnect } from './packages/db/db.js'
import {
    logLevel,
    dbName,
} from './config.js'
import pino from './packages/logger/pino.js'
import { UsersDao } from './implements/dao/users.js'
import { UsersService } from './implements/services/usersService.js'
import { UsersController } from './implements/controllers/usersController.js'

export const logger = pino({ logLevel })
export const db = dbConnect({
    client: 'sqlite3',
    connection: { filename: dbName },
    useNullAsDefault: true,
})

if (process.env.NODE_ENV === 'dev') {
    db.on('query', queryData => logger.debug(`sql: ${queryData.sql} | bindings: ${queryData.bindings}`))
}

export const usersDao = new UsersDao(db, 'users')

export const usersService = new UsersService({ usersDao })
export const usersController = new UsersController({ usersService })

export const controllers = { usersController }
