import type { FastifyRequest, FastifyReply } from 'fastify'

export const xResponseTimeMiddle = async (req: FastifyRequest, res: FastifyReply) => {
    res.headers({ 'x-response-time': res.getResponseTime().toFixed(0) })
}
