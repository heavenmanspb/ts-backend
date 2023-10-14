import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import fp from 'fastify-plugin'
import { getVersion } from '../../utils/utils.js'

export default fp(async fastify => {
    const swaggerOptions = {
        swagger: {
            info: {
                title: 'Backend example',
                description: 'Stack: typescript, knex, sqlite3, fastify',
                version: getVersion(),
            },
            schemes: ['http', 'https'],
            consumes: ['application/json'],
            produces: ['application/json'],
            tags: [{ name: 'Default', description: 'Default' }],
        },
    }

    const swaggerUiOptions = {
        routePrefix: '/docs',
        exposeRoute: true,
    }

    fastify.register(fastifySwagger, swaggerOptions)
    fastify.register(fastifySwaggerUI, swaggerUiOptions)
})
