const map = new Map();

map.set("1", {userId: 1, name: "qwe", password: "qwe"});

export default class UserRepository{
  save (user) {
    map.set(user.userId, user)
    console.log(map)
  }

  get (userId) {
    return map.get(userId)
  }

  getAll() {
    return map.values();
  }

  getUserByName(name) {
    for (let user of map.values()) {
      if (user.name === name) {
        return user;
      }
    }

    return null;
  }

}