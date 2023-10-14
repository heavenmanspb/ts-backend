export const logLevel = process.env.LOG_LEVEL ?? 'info'
export const dbName = process.env.DB || './db.sqlite3'

export const httpOpts = {
    host: process.env.HTTP_HOST || '0.0.0.0',
    port: Number(process.env.HTTP_PORT || 80),
}
