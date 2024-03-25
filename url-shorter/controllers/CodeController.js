import {Router} from "express";
import InfoService from "../services/InfoService.js";
import UserService from "../services/UserService.js";
import RateLimitService from "../services/RateLimitService.js";


const config = {
  requestsLimit: 10,
  timeLimit: 60000,
  userRequestsLimit: 20,
  userTimeLimit: 20000,
}

export default class UrlController extends Router {
  constructor() {
    super();
    this.infoService = new InfoService();
    this.userService = new UserService();
    this.rateLimitService = new RateLimitService();
    this.init();
  }

  init = () => {
    this.get('/:code', async(req, res)  => {
      const userData = this.infoService.getCode(req?.params.code);
      const { visits, url, ...rest } = userData || {};
      const info = this.userService.getUserByName(userData?.name);
      const userId = String(info?.userId);
      await this.rateLimitService.checkLimit(req?.params.code, config.requestsLimit, config.timeLimit, res);
      await this.rateLimitService.checkLimit(userId, config.userRequestsLimit, config.userTimeLimit, res);

      if (url) {
        res.status(302).redirect(url);
        this.infoService.updateVisits({url, visits: visits +1, ...rest})
      } else {
        res.sendStatus(404)
      }
    })
  }
}