import Info from "../entity/Info.js";

export default class InfoRepository{
  async save(code, user_role, url, visits, created_time, user_name){
    await Info.query().insert({ code, user_role, user_name, created_time, url, visits })
  }

  async update(visits, id){
    return await Info.query().findById(id).patch({visits})

  }

  async get(code){
    return await Info.query().findOne({code});
  }

  async getUserUrls(user_name){
    return await Info.query().findOne({user_name})
  }
}