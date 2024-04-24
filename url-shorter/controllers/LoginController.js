import {Router} from "express";
import UserService from "../services/UserService.js";


export default class LoginController extends Router {
  constructor() {
    super();
    this.initRoutes();
    this.userService = new UserService();
  }

  initRoutes = function () {
    this.get("/", (req, res) => {
      res.render("login", {errorMessage:""})
    });

    this.post("/", (req, res) => {
      const {login, password} = req.body;
      this.userService.checkPassword(login, password)
        .then(result => {
          if (result) {
            req.session.login = login;

            this.userService.getUserByName(login)
              .then(user =>  {
                res.redirect(302, `/user/${user.id}`)
              })
          } else {
            res.render("login.pug", {errorMessage: "Unauthorized"});
          }
        })
    });
  }
}