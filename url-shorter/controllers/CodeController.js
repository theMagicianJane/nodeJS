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
    this.get('/:code', (req, res) => {
      this.infoService.getCode(req?.params.code)
        .then(userData => {
          const { visits, url, id } = userData || {};

          if (url) {
            res.status(302).redirect(url);

            this.infoService.updateVisits(visits + 1, id)
          } else {
            res.sendStatus(404)
          }
        })
    })
  }
}