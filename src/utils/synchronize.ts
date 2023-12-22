export const synchronize = <T extends unknown[], R>(fn: (...args: T) => Promise<R>) => {
    let promise: Promise<R> | null = null
    return (...args: T): Promise<R> => {
        promise = promise ?? fn(...args).then(res => {
            promise = null
            return res
        })
        return promise
    }
}
