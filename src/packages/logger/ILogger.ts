export interface ILogger {
    readonly level: string
    fatal(msg: string | object): void
    error(msg: string | object): void
    warn(msg: string | object): void
    info(msg: string | object): void
    debug(msg: string | object): void
    trace(msg: string | object): void
    silent(msg: string | object): void
}
