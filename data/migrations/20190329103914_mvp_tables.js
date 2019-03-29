
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('projects', tbl => {
        tbl.increments();
        tbl.string('name').notNullable().unique();
        tbl.string('description').notNullable();
        tbl.boolean('complete').defaultTo(false);
        
    })
    .createTable('actions', tbl => {
        tbl.increments();
        tbl.string('description').notNullable();
        tbl.string('notes').notNullable();
        tbl.integer('project_id').notNullable().unsigned()
            .references('id').inTable('projects')
            .onUpdate('CASCADE').onDelete('RESTRICT');
        tbl.boolean('complete').defaultTo(false);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('actions')
    .dropTableIfExists('projects');
};
