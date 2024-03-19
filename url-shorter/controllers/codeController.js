import express from "express";
import infoService from "../services/infoService.js";

const router = new express.Router();

router.get('/:code', (req, res) => {
  const userData = infoService.get('userData')
  const { visits, url, ...rest } = userData;

  if (url) {
    res.status(302).redirect(userData.url);
    infoService.add('userData', {visits: visits + 1, url, ...rest})

  } else {
    res.sendStatus(404)
  }
});

export default router;