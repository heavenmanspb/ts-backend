import type { FastifyInstance } from 'fastify'
import type { TUser } from '../../../types/entity.js'
import type { TPagination } from '../../../types/common.js'
import type { IUsersController } from '../../../interfaces/controllers/IUsersController.js'

import * as schemas from '../../schemas/users.js'

export default (controller: IUsersController) => async (fastify: FastifyInstance) => {
    fastify.route<{
        Querystring: TPagination
    }>({
        method: 'GET',
        url: '/',
        schema: schemas.schemaGetUsers,
        handler: async (req, res) => {
            const { query } = req

            const { limit, offset } = query
            const pagination = { limit, offset }

            return controller.getUsersPaginated(null, null, pagination)
        },
    })

    fastify.route<{
        Body: TUser
    }>({
        method: 'POST',
        url: '/',
        schema: schemas.schemaCreateUser,
        handler: async (req, res) => {
            const { body } = req
            return controller.createUser(body)
        },
    })

    fastify.route<{
        Params: { id: string }
    }>({
        method: 'GET',
        url: '/:id',
        schema: schemas.schemaGetUser,
        handler: async (req, res) => {
            const { params } = req
            return controller.getUserById(params.id)
        },
    })

    fastify.route<{
        Params: { id: string },
        Body: Partial<TUser>
    }>({
        method: 'PATCH',
        url: '/:id',
        schema: schemas.schemaUpdateUser,
        handler: async (req, res) => {
            const { params, body } = req
            await controller.updateUserById(params.id, body)
        },
    })

    fastify.route<{
        Params: { id: string },
    }>({
        method: 'DELETE',
        url: '/:id',
        schema: schemas.schemaDeleteUser,
        handler: async (req, res) => {
            const { params } = req
            await controller.deleteUserById(params.id)
        },
    })
}
