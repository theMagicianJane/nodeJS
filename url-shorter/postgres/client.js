import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  host: 'localhost',
  port: 5433,
  database: 'users',
  user: 'postgres',
  password: '1111',
})

await client.connect();

export default client;