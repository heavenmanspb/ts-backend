import type { FastifyInstance } from 'fastify'
import type { IUsersController } from '../../interfaces/controllers/IUsersController.js'
import type { ILogger } from '../../packages/logger/ILogger.js'
import { validatorCompiler } from './validation.js'
import { errorHandlerFactory } from '../plugins/errorHandlerFactory.js'
import usersRoutes from './users/users.js'

export default (di: {
    usersController: IUsersController,
    logger: ILogger
}) => async (fastify: FastifyInstance) => {
    fastify.setValidatorCompiler(validatorCompiler)
    fastify.setErrorHandler(errorHandlerFactory(di.logger))

    await fastify.register(usersRoutes(di.usersController), { prefix: '/users' })
}
