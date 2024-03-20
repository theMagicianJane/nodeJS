const map = new Map();

map.set("Qwe", {code: "Qwe", name: "qwe", user: "Yana", created_time: new Date(), url: '', visits: 0});

export default class InfoRepository{
  save(code){
    map.set(code.code, code)
  }

  get(code){
    return map.get(code)
  }

  getUserUrls(user){
    const activeUrls = []

    map.forEach(values => {
      if (values.user === user){
        activeUrls.push(values)
      }
    });

    return activeUrls
  }
}