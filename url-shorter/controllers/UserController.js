import { Router } from "express";
import UserService from '../services/userService.js';


export default class UserController extends Router {
  constructor(){
    super();
    this.userService = new UserService();
    this.init();
  }
  init = () => {
    this.get('/all', (req, res) =>  {
      const users = this.userService.getUsersPublicData();

      res.render('users.pug', {users})
    })

    this.post('/create', (req, res) => {
      const {name, password} = req.body;
      this.userService.create(name, password)

      res.redirect('/user/all');
    })

    this.get("/:userId", (req, res) => {
      const user = this.userService.getUser(req.params.userId);
      res.json(user);
    });
  }
}