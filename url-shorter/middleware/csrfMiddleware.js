import {generateHash} from "../../utils.js";

function initCsrfTokenMiddleware(req, res, next) {
  if (!req.session.csrfToken) {
    req.session.csrfToken = generateHash(16);
  }

  next();
}

function checkCsrfTokenMiddleware(req, res, next) {
  if (req.session.csrfToken !== req.body.csrfToken) {
    return res.status(403);
  }
  next();
}

export {initCsrfTokenMiddleware, checkCsrfTokenMiddleware}