import postgres from '../postgres/client.js';


export default class UserRepository{
  async save (id, login, email, user_type, user_name, password) {
    const text = 'INSERT INTO users(id, login, email, user_type, user_name, password) VALUES($1, $2, $3, $4, $5, $6)'
    const values = [id, login, email, user_type, user_name, password]
    await postgres.query(text, values)
  }

  async get (userId) {
    const { rows } = await postgres.query(`SELECT * from users WHERE id=${userId}`)

    return rows[0];
  }

  async getAll() {
    const all = await postgres.query('SELECT * from users')

    return all.rows;
  }

  async getUserByName(user_name) {
    const query = {
      text: 'SELECT * from users WHERE user_name=$1',
      values: [user_name],
    }
    const { rows } = await postgres.query(query)

    return rows[0];
  }
}