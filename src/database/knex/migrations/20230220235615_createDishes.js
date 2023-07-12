exports.up = knex => knex.schema.createTable("dishes", table => {
  table.increments("id");

  table.text("title").notNullable();
  table.text("description");
  table.text("category").notNullable();
  table.float("price").notNullable();
  table.text("image").nullable();

  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("dishes");
