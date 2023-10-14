import fp from 'fastify-plugin'
import type { FastifyInstance } from 'fastify'
import { xResponseTimeMiddle } from './xResponseTime.js'

export default fp(async (fastify: FastifyInstance) => {
    fastify.addHook('onSend', xResponseTimeMiddle)
})
