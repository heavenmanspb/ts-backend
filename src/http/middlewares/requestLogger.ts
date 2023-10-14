import fp from 'fastify-plugin'
import type { FastifyInstance } from 'fastify'

export const requestLoggerPlugin = fp(async (fastify: FastifyInstance) => {
    fastify.addHook('preHandler', async (req, reply) => {
        const startTime = Date.now()

        const request = JSON.stringify({
            ...(Object.keys(req.params ?? {}).length > 0 ? { params: req.params } : {}),
            ...(Object.keys(req.query ?? {}).length > 0 ? { query: req.query } : {}),
            ...(Object.keys(req.body ?? {}).length > 0 ? { body: req.body } : {}),
            ...(Object.keys(req.headers ?? {}).length > 0 ? { headers: req.headers } : {}),
        })

        fastify.log.info(`Request | id: ${req.id} | [${req.method}] ${req.url} | ${request}`)

        reply.raw.on('finish', () => {
            const endTime = Date.now()
            const responseTime = endTime - startTime

            const response = JSON.stringify({ statusCode: reply.statusCode })

            fastify.log.info(`Reply   | id: ${req.id} | ${response} | +${responseTime}ms`)
        })
    })
})
