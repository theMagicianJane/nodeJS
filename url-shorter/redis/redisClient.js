import {createClient} from "redis";

const redisClient = createClient(6380, 'localhost');

redisClient.connect().catch(console.error);
redisClient.on('connect', function () {
  console.log('redis connected');
}).on('error', function (error) {
  console.log(error);
});

export default redisClient;