const map = new Map();

map.set("1", {userId: 1, name: "qwe", password: "qwe"});

export default class UserRepository{
  save (user) {
    map.set(user.userId, user)
  }

  get (userId) {
    return map.get(userId)
  }

  getAll() {
    return map.values();
  }
}