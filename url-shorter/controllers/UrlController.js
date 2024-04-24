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
      console.log(currentUser)
      this.infoService.getCurrentUserUrl(currentUser)
        .then(userUrls => {
          res.render('url-shorters.pug', {userUrls, user: userUrls[0]?.user})
        })
    })

    this.post('/create', express.json(), (req, res) => {
      const { code, user_role, user_name, created_time, visits } = req.body
      this.infoService.create(code, user_role, generateUrl(), visits, created_time, user_name)

      res.json(req.body)
    });
  }
}