import {Router} from "express";
import InfoService from "../services/InfoService.js";
import UserService from "../services/UserService.js";


export default class UrlController extends Router {
  constructor() {
    super();
    this.infoService = new InfoService();
    this.userService = new UserService();
    this.init();
  }

  init = () => {
    this.get('/:code', (req, res)  => {
      const userData = this.infoService.getCode(req?.params.code);
      const { visits, url, ...rest } = userData || {};

      if (url) {
        res.status(302).redirect(url);
        this.infoService.updateVisits({url, visits: visits +1, ...rest})
      } else {
        res.sendStatus(404)
      }
    })
  }
}