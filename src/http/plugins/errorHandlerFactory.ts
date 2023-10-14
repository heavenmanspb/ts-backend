import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import type { ILogger } from '../../packages/logger/ILogger.js'
import {
    BadRequest,
    Forbidden,
    NotImplemented,
    ServiceUnavailable,
    Unauthorized,
    Conflict,
    NotFound,
} from '../../errors/domain.js'

const errorStatusMap = new Map<typeof Error.constructor, number>([
    [BadRequest, 400],
    [Unauthorized, 401],
    [Forbidden, 403],
    [NotFound, 404],
    [Conflict, 409],
    [NotImplemented, 501],
    [ServiceUnavailable, 503],
])

export const errorHandlerFactory = (logger: ILogger) => (error: FastifyError, request: FastifyRequest, response: FastifyReply) => {
    const message = error?.validation?.length > 0 ? `Validation error: ${error.message}` : error.message ?? 'Something went wrong'
    const statusCode = error.statusCode ?? errorStatusMap.get(error.constructor) ?? 500

    if (statusCode === 500) logger.error(error)

    response.status(statusCode)
    return response.send({ message })
}
