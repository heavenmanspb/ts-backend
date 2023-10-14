const schemasResponse = {
    200: {
        type: 'object',
        description: 'OK',
        properties: { message: { type: 'string' } },
        required: ['message'],
    },
    204: {
        type: 'null',
        description: 'No Content',
    },
    400: {
        type: 'object',
        description: 'Bad Request',
        properties: { message: { type: 'string' } },
        required: ['message'],
    },
    401: {
        type: 'object',
        description: 'Unauthorized',
        properties: { message: { type: 'string' } },
        required: ['message'],
    },
    403: {
        type: 'object',
        description: 'Forbidden',
        properties: { message: { type: 'string' } },
        required: ['message'],
    },
    404: {
        type: 'object',
        description: 'Not found',
        properties: { message: { type: 'string' } },
        required: ['message'],
    },
    409: {
        type: 'object',
        description: 'Conflict',
        properties: { message: { type: 'string' } },
        required: ['message'],
    },
    500: {
        type: 'object',
        description: 'Internal Server Error',
        properties: { message: { type: 'string' } },
        required: ['message'],
    },
    503: {
        type: 'object',
        description: 'Service Unavailable',
        properties: { message: { type: 'string' } },
        required: ['message'],
    },
}

type TErrorCode = 200|204|400|401|403|404|409|500|503

const responseSchemasCreator = (codes: TErrorCode[]) => codes.reduce((acc, val) => ({ ...acc, [val]: schemasResponse[val] }), {})

export { schemasResponse, responseSchemasCreator }
