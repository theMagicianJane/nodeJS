import redisClient from "../redis/redisClient.js";
import { currentDate, defaultData, stringify, getUser } from "../utils/rateLimitUtils.js";
import UserService from "../services/UserService.js";


const config = {
  code: {
    requestsLimit: 10,
    timeLimit: 60000,
  },
  id: {
    requestsLimit: 20,
    timeLimit: 20000,
  }
}

async function checkLimit (code, res, type){
  const data = await redisClient.get(String(code));

  if (data) {
    const { createdDate, firstRequestDate, requests } = JSON.parse(data);
    const isExceededTime = (createdDate - firstRequestDate) > config[type].timeLimit;
    const isExceededRequests = requests >= config[type].requestsLimit;

    if (isExceededRequests || (isExceededTime && isExceededRequests)){
      res.status(429).send('Too many requests. Try again later.')
    } else {
      await redisClient.set(String(code),
        stringify({
        requests: requests + 1,
        createdDate: currentDate,
        firstRequestDate }))
    }
  } else {
    await redisClient.set(String(code), stringify(defaultData))
  }
}

function rateLimitMiddleware(req, res, next) {
  const code = req.path.slice(1);
  const userId = new UserService().getUserByName(getUser(req))?.userId;

  checkLimit(code, res, 'code')
  checkLimit(userId, res, 'id')

  next()
}

export {rateLimitMiddleware}