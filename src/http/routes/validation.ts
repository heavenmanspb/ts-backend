import Ajv from 'ajv'
import AjvFormats from 'ajv-formats'
import type { FastifySchema, FastifySchemaCompiler } from 'fastify'

const AjvDefault = AjvFormats(new Ajv({
    useDefaults: true,
    coerceTypes: true,
    removeAdditional: false,
}))

const AjvRemoveAdditional = AjvFormats(new Ajv({
    useDefaults: true,
    coerceTypes: true,
    removeAdditional: 'all',
}))

const schemaCompilers = {
    body: AjvRemoveAdditional,
    params: AjvDefault,
    querystring: AjvDefault,
    headers: AjvDefault,
}

export const validatorCompiler: FastifySchemaCompiler<FastifySchema> = req => {
    if (!req.httpPart) throw new Error('Missing httpPart')
    const compiler = schemaCompilers[req.httpPart]
    if (!compiler) throw new Error(`Missing compiler for ${req.httpPart}`)
    return compiler.compile(req.schema)
}
