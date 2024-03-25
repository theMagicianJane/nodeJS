import redisClient from "../redis/redisClient.js";
import UserService from "./UserService.js";
import { stringify, defaultData, currentDate } from "../utils/rateLimitUtils.js";


export default class RateLimitService{
  constructor() {
    this.userService = new UserService()
  }

  async checkLimit(requstedData, requestsLimit, timeLimit, res) {
    const data = await redisClient.get(String(requstedData));

    if (data) {
      const requestedCode = JSON.parse(data);
      const { createdDate, firstRequestDate, requests } = requestedCode;

      if (requests >= requestsLimit || (((createdDate - firstRequestDate) > timeLimit) && requests >= requestsLimit)){
        res.send('Too many requests. Try again later.')
      } else {
        await redisClient.set(String(requstedData), stringify({ requests: requests + 1, createdDate: currentDate, firstRequestDate }))
      }
    } else {
        await redisClient.set(String(requstedData), stringify(defaultData))
    }
  }
}