import pino from 'pino'
import pretty from 'pino-pretty'
import type { ILogger } from './ILogger.js'

const stream = pretty({
    colorize: true,
    translateTime: 'SYS:yyyy-mm-dd HH:MM:ss.l o',
    ignore: 'pid,hostname',
    singleLine: true,
})

const AVAILABLE_LEVELS = [
    'fatal',
    'error',
    'warn',
    'info',
    'debug',
    'trace',
]

const DEFAULT_LEVEL = 'info'

export default ({ logLevel }: { logLevel: string }): ILogger => {
    let level = logLevel.toLowerCase()
    if (!AVAILABLE_LEVELS.includes(logLevel)) level = DEFAULT_LEVEL
    return pino({ level }, stream)
}
