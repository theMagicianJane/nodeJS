import express from "express";
import infoService from "../services/infoService.js";
import generateHash from "../../utils.js";

const router = new express.Router();

router.get('/url', (req, res) => {
  const data = infoService.get('userData')

  res.json(data.url);
});

router.post('/', express.json(), (req, res) => {
  const userData = { url: generateHash(), ...req.body}
    infoService.add('userData', userData)

    res.json(req.body)
  });

export default router