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
      this.userService.getUsersPublicData()
        .then(users => res.render('users.pug', {users}))
    })

    this.post('/create', (req, res) => {
      const {id, user_type, email, login, user_name, password} = req.body;
      this.userService.create(id, user_type, email, login, user_name, password)

      res.redirect('/user/all');
    })

    this.get("/:userId", (req, res) => {
      this.userService.getUser(req.params.userId)
        .then(user => res.json(user))
    });
  }
}