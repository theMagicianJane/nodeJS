import Users from "../entity/Users.js";

export default class UserRepository{
  async save (id, login, email, user_type, user_name, password) {
    await Users.query().insert({
      id,
      login,
      email,
      user_type,
      user_name,
      password
    })
  }

  async get (userId) {
    return await Users.query().findById(userId)
  }

  async getAll() {
    return await Users.query();
  }

  async getUserByName(user_name) {
    return await Users.query().findOne({user_name})
  }
}