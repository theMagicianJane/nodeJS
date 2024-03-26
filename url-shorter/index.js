import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import session from "express-session";
import RedisStore from "connect-redis";
import redisClient from "./redis/redisClient.js";
import UrlController from "./controllers/UrlController.js";
import CodeController from "./controllers/CodeController.js";
import UserController from "./controllers/UserController.js";
import LoginController from "./controllers/LoginController.js";
import { rateLimitMiddleware } from "./middleware/rateLimitMiddleware.js";


const app = express();


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
  store: new RedisStore({
    client: redisClient, ttl: 86400
  }),
  secret: "QWESdfisdfj3", //TODO should be stored in config!
  saveUninitialized: true,
  resave: false,
  name: "sessionId",
  cookie: {
    httpOnly: true,
    domain: "127.0.0.1",
  },
}));

app.all('/', (req, res) => {
  res.send('Works!')
});
app.set('view engine', 'pug');
app.use('/files', express.static("view"));

app.use('/code', rateLimitMiddleware);

app.use('/login', new LoginController())
app.use('/code', new CodeController());
app.use('/info', new UrlController());
app.use('/user', new UserController());

/*app.use((err, req, res) => {
  console.log(err)
});*/

app.listen(8000, () => {
  console.log('Server is started');
});