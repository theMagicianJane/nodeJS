import {generateHash} from "../../utils.js";

const SESSION_ID = "sessionId";

const storage = {};

export default function sessionMiddleware(req, res, next) {
  let sessionId = req.cookies[SESSION_ID];
  let session = storage[sessionId];

  if (!session) {
    if (!sessionId) {
      sessionId = generateHash(16);
      res.cookie("sessionId", sessionId, {domain: req.hostname});
    }
    session = {}
  }

  req.sessionId = sessionId;
  req.session = session;

  next();

  storage[sessionId] = session;
}