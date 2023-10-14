import { logger, controllers } from './container.js'
import { httpOpts } from './config.js'

import { FastifyServer } from './http/server.js'

const server = new FastifyServer({
    config: { httpOpts },
    logger,
    controllers,
})
await server.start()

process.on('SIGINT', async () => {
    await server.stop()
    logger.info('Server stopped.')
    process.exit(0)
})
