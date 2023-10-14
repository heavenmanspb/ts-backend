/* eslint max-classes-per-file: "off" */
export class DBError extends Error {
    constructor(message: string = 'Database request failed', detail = '') {
        super(`${message}; Cause: ${detail}`)
    }
}

export class InsertionError extends DBError {
    constructor(message: string = 'Failed to create record: invalid data', detail = '') {
        super(message, detail)
    }
}

export class UniqueError extends InsertionError {}

export function throwDbError(error): never {
    throw new DBError(error.detail, error.message)
}
