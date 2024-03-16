import express from "express";
import userService from '../services/userService.js';

const router = new express.Router();

router.post('/create', express.json(), (req, res) => {
  userService.add('user', req.body);
  res.json(req.body)
});

router.get('/email', (req, res) => {
  res.send('test@test.com')
});

export default router;