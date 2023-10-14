import fastify from 'fastify'
import type { FastifyInstance, FastifyListenOptions } from 'fastify'
import type { ILogger } from '../packages/logger/ILogger.js'
import swagger from './plugins/swagger.js'
import middlewares from './middlewares/index.js'
import routesFactory from './routes/index.js'
import { requestLoggerPlugin } from './middlewares/requestLogger.js'
import type { Controllers } from '../interfaces/controllers/Controllers.js'

type httpOpts = {
    host: string
    port: number
}

export class FastifyServer {
    private server: FastifyInstance
    httpOpts: FastifyListenOptions
    constructor({ config, logger, controllers }: {
        config: {
            httpOpts: httpOpts
        },
        logger: ILogger,
        controllers: Controllers
    }) {
        this.server = fastify({
            logger,
            ignoreTrailingSlash: true,
            ignoreDuplicateSlashes: true,
        })

        this.server.register(middlewares)
        this.server.register(requestLoggerPlugin)
        if (process.env.NODE_ENV === 'dev') this.server.register(swagger)

        const routes = routesFactory({
            usersController: controllers.usersController,
            logger,
        })

        this.server.register(routes)

        this.httpOpts = config.httpOpts
    }

    async start() {
        const { host, port } = this.httpOpts
        try {
            await this.server.listen({ host, port })
            this.server.log.warn(`Server listening at http://${host}:${port}`)
        } catch (err) {
            this.server.log.error(err)
            process.exit(1)
        }
    }

    async stop() {
        await this.server.close()
        this.server.log.info('Server stopped.')
    }
}
