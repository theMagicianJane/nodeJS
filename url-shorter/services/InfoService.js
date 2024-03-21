import InfoRepository from "../repository/infoRepository.js";
import InfoModel from "../models/InfoModel.js";


export default class InfoService{
  constructor() {
    this.infoRepository = new InfoRepository()
  }

  create(code, name, url, visits, created_time, user){
    const info = new InfoModel(code, name, url, visits, created_time, user);
    this.infoRepository.save(info);
  }

  updateVisits(info){
    this.infoRepository.save(info);
  }

  getCode(code){
    return this.infoRepository.get(code)
  }

  getCurrentUserUrl(user){
    return this.infoRepository.getUserUrls(user)
  }
}