import { responseSchemasCreator } from './response.js'

const user = {
    type: 'object',
    properties: {
        id: { type: 'string', format: 'uuid' },
        name: { type: 'string' },
        age: { type: 'number' },
    },
}

export const schemaGetUsers = {
    description: 'Get users.',
    tags: ['users'],
    querystring: {
        type: 'object',
        properties: {
            limit: { type: 'number' },
            offset: { type: 'number' },
            sortColumn: { enum: ['name', 'age'] },
            sortOrder: { enum: ['asc', 'desc'] },
        },
    },
    response: {
        ...responseSchemasCreator([400, 401, 403, 404]),
        200: {
            description: 'Users.',
            type: 'object',
            properties: {
                items: {
                    type: 'array',
                    items: { ...user },
                },
                limit: { type: 'number' },
                offset: { type: 'number' },
                total: { type: 'number' },
            },
        },
    },
}

export const schemaGetUser = {
    description: 'Get user.',
    tags: ['users'],
    params: {
        type: 'object',
        properties: { id: { type: 'string', format: 'uuid' } },
    },
    response: {
        ...responseSchemasCreator([400, 401, 403, 404]),
        200: {
            description: 'User.',
            ...user,
        },
    },
}

export const schemaCreateUser = {
    description: 'Create user.',
    tags: ['users'],
    body: {
        type: 'object',
        properties: {
            name: { type: 'string' },
            age: { type: 'number' },
        },
        required: ['name', 'age'],
    },
    response: {
        ...responseSchemasCreator([400, 403, 404]),
        200: {
            description: 'User.',
            ...user,
        },
    },
}

export const schemaUpdateUser = {
    description: 'Update user.',
    tags: ['users'],
    params: {
        type: 'object',
        properties: { id: { type: 'string', format: 'uuid' } },
    },
    body: {
        type: 'object',
        properties: {
            name: { type: 'string' },
            age: { type: 'number' },
        },
        anyOf: [
            { required: ['name'] },
            { required: ['age'] },
        ],
    },
    response: { ...responseSchemasCreator([204, 400, 401, 403, 404]) },
}

export const schemaDeleteUser = {
    description: 'Delete user.',
    tags: ['users'],
    params: {
        type: 'object',
        properties: { id: { type: 'string', format: 'uuid' } },
    },
    response: { ...responseSchemasCreator([204, 400, 401, 403, 404]) },
}
