/* eslint max-classes-per-file: "off" */
export class BadRequest extends Error {
    constructor(msg = 'Bad request') {
        super(msg)
    }
}

export class Unauthorized extends Error {
    constructor(msg = 'Unauthorized') {
        super(msg)
    }
}

export class Forbidden extends Error {
    constructor(msg = 'Access denied') {
        super(msg)
    }
}

export class NotFound extends Error {
    constructor(message = 'Not found') {
        super(message)
    }
}

export class Conflict extends Error {
    constructor(message = 'Conflict') {
        super(message)
    }
}

export class NotImplemented extends Error {
    constructor(msg = 'Not implemented yet') {
        super(msg)
    }
}

export class ServiceUnavailable extends Error {
    constructor(msg = 'Service unavailable') {
        super(msg)
    }
}
