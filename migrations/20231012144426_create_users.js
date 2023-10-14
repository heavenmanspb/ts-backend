/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.createTable('users', table => {
        table.string('id').primary()
        table.string('name').notNullable()
        table.integer('age').notNullable()
        table.timestamp('created_at', { precision: 3, useTz: true }).defaultTo(knex.fn.now())
        table.timestamp('updated_at', { precision: 3, useTz: true }).defaultTo(knex.fn.now())
        table.timestamp('deleted_at', { precision: 3, useTz: true })
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.schema.dropTable('users')
}
