export const synchronize = <T extends any[], R>(fn: (...args: T) => Promise<R>) => {
    let promise: Promise<R> | null = null
    return (...args: T): Promise<R> => {
        promise = promise ?? fn(...args).then(res => {
            promise = null
            return res
        })
        return promise
    }
}
