import InfoRepository from "../repository/infoRepository.js";


export default class InfoService{
  constructor() {
    this.infoRepository = new InfoRepository()
  }

  create(code, user_role, url, visits, created_time, user_name){
    this.infoRepository.save(code, user_role, url, visits, created_time, user_name);
  }

  updateVisits(visits, id){
    this.infoRepository.update(visits, id);
  }

  getCode(code){
    return this.infoRepository.get(code)
  }

  getCurrentUserUrl(user){
    return this.infoRepository.getUserUrls(user)
  }
}