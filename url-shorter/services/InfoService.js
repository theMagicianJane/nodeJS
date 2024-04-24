import InfoRepository from "../repository/infoRepository.js";


export default class InfoService {
  constructor() {
    this.infoRepository = new InfoRepository()
  }

  async create(code, user_role, url, visits, created_time, user_name){
    await this.infoRepository.save(code, user_role, url, visits, created_time, user_name);
  }

  async updateVisits(visits, id){
    await this.infoRepository.update(visits, id);
  }

  async getCode(code){
    return await this.infoRepository.get(code)
  }

  async getCurrentUserUrl(user){
    return await this.infoRepository.getUserUrls(user)
  }
}