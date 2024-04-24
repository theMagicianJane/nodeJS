import knex from 'knex';
import {Model} from 'objection';


function init() {
  const client = knex({
    client: 'pg',
    connection: {
      host: 'localhost',
      port: 5433,
      database: 'users',
      user: 'postgres',
      password: '1111',
    }
  });

  Model.knex(client);

  return client
}

export default init;