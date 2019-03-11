const { Model, snakeCaseMappers } = require("objection");
const knex = require("knex")({
  // client: "pg",
  // connection: `${process.env.DATABASE_URL}?ssl=true`,

  client: 'sqlite3',
  connection: {
    filename: __dirname + "/example.db",
  }
});


// knex.schema
//   .createTableIfNotExists('user', function (table) {
//     table.increments("id").primary();
//     table.string("username");
//     table.timestamps();
//   })
//   .createTableIfNotExists('user__email', function (table) {
//     table.integer('user_id').references('id').on("user").index();
//     table.string("email");
//   })
//   .then(() => {
//     console.log("tables created");
//   })
//   .catch(() => {
//     // just ignore...
//   });

Model.knex(knex);

class BaseModel extends Model {
  static get columnNameMappers() {
    return snakeCaseMappers();
  }
}

class Email extends BaseModel {
  static get tableName() {
    return "user__email";
  }
}

class User extends BaseModel {
  static get tableName() {
    return  "user";
  }

  static get relationMappings() {
    return {
      emails: {
        join: {
          from: "user__email.user_id",
          to: "user.id",
        },
        modelClass: Email,
        relation: Model.HasManyRelation,
      },
    };
  }

  // in JS, you don't need to declare `emails`
  // in TS, it's required:
  // public emails?: Email;
}

// User.query()
//   .insert({
//     username: Math.random().toString(36).substring(7) ,
//     createdAt: new Date(),
//   })
//   .then(($createdUser) => {
//     return $createdUser.$relatedQuery("emails")
//       .insert([
//         {
//           email: Math.random().toString(36).substring(7),
//           userId: $createdUser.id,
//         },
//       ])
//       .then(loadAll);
//   });


module.exports = {
  BaseModel,
  Email,
  knex,
  User,
}
