export class RateLimiter {
    private readonly maxExecutions: number
    private readonly interval: number
    private executions = 0
    private lastExecutionTime = 0

    constructor(maxExecutions: number, interval = 1000) {
        this.maxExecutions = maxExecutions
        this.interval = interval
    }

    async execute<T, A extends unknown[]>(
        asyncFn: (...args: A) => Promise<T>,
        ...args: A
    ): Promise<T> {
        const now = Date.now()
        const elapsedTime = now - this.lastExecutionTime

        if (elapsedTime >= this.interval) this.executions = 0

        if (this.executions < this.maxExecutions) {
            this.executions += 1
            this.lastExecutionTime = now
            return asyncFn(...args)
        }

        const delay = this.interval - elapsedTime
        await new Promise<void>(resolve => {
            setTimeout(resolve, delay)
        })

        return this.execute(asyncFn, ...args)
    }
}
