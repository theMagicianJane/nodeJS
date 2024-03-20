import express, {Router} from "express";
import { generateUrl } from "../../utils.js";
import InfoService from "../services/InfoService.js";


export default class UrlController extends Router {
  constructor() {
    super();
    this.infoService = new InfoService();
    this.init();
  }

  init = () => {
    this.get('/url', (req, res) => {
      const auth = req.header('Authorization');
      const currentUser = auth?.substring(6, auth.length).split(':')[0]
      const userUrls = this.infoService.getCurrentUserUrl(currentUser)

      res.render('url-shorters.pug', {userUrls, user: userUrls[0]?.user})
    })

    this.post('/create', express.json(), (req, res) => {
      const { code, name, user, created_time, visits } = req.body
      this.infoService.create(code, name, generateUrl(),visits, created_time, user)

      res.json(req.body)
    });
  }
}