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

      if (this.userService.checkPassword(login, password)) {
        req.session.login = login;
        const user = this.userService.getUserByName(login);
        res.redirect(302, `/user/${user.userId}`);
      } else {
        res.render("login.pug", {errorMessage: "Unauthorized"});
      }
    });
  }
}