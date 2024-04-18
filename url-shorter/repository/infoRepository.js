import postgres from "../postgres/client.js";


export default class InfoRepository{
  async save(code, user_role, url, visits, created_time, user_name){
    const text = 'INSERT INTO info(code, user_role, user_name, created_time, url, visits) VALUES($1, $2, $3, $4, $5, $6)'
    const values = [code, user_role, user_name, created_time, url, visits]
    await postgres.query(text, values)
  }

  async update(visits, id){
    await postgres.query(`UPDATE info SET visits=${visits} WHERE id=${id}`)
  }

  async get(code){
    const query = {
      text: 'SELECT * from info WHERE code=$1',
      values: [code],
    }
    const user = await postgres.query(query);

    return user.rows[0];
  }

  async getUserUrls(user_name){
    const query = {
      text: `SELECT * from info WHERE user_name=$1`,
      values: [user_name]
    }
    const { rows } = await postgres.query(query)

    return rows
  }
}