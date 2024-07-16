exports.up = knex => knex.schema.createTable("dishes", table => {
  table.increments("id").primary();
  table.string("name").notNullable();
  table.string("description").notNullable();
  table.string("image").defaultTo(null);
  table.float("price").notNullable();
  table.enum("category", ["meal", "drink", "dessert"], {
    useNative: true,
    enumName: "categories",
  }).notNullable().defaultTo("meal");

  table.timestamp("created_at").defaultTo(knex.fn.now());
  table.timestamp("updated_at").defaultTo(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("dishes");
