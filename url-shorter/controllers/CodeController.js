import {Router} from "express";
import InfoService from "../services/InfoService.js";


export default class UrlController extends Router {
  constructor() {
    super();
    this.infoService = new InfoService();
    this.init();
  }

  init = () => {
    this.get('/:code', (req, res) => {
      const userData = this.infoService.getCode(req?.params.code);
      const { visits, url, code, created_time, user, name } = userData || {};

      if (url) {
        res.status(302).redirect(userData.url);
        this.infoService.create(code, name, url, visits +1, created_time, user)
      } else {
        res.sendStatus(404)
      }
    })
  }
}